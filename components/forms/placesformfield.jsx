import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
// -------------------------------
import { googleMapsApi } from "../../constants/common";

const GOOGLE_PLACES_KEY = googleMapsApi; // ideally proxy through your PHP API

function makeSessionToken() {
  // Google recommends UUIDv4, but this fallback works if crypto.randomUUID isn't available. :contentReference[oaicite:1]{index=1}
  if (global?.crypto?.randomUUID) return crypto.randomUUID();
  return `st_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

async function fetchPlaceSuggestions({ input, sessionToken }) {
  // Autocomplete (New) endpoint. :contentReference[oaicite:2]{index=2}
  const url = "https://places.googleapis.com/v1/places:autocomplete";

  const body = {
    input,
    sessionToken, // supported parameter :contentReference[oaicite:3]{index=3}
    includedRegionCodes: ["NG"], // restrict to Nigeria :contentReference[oaicite:4]{index=4}
    languageCode: "en",
    // optional: bias towards Lagos (can remove if you like)
    locationBias: {
      circle: {
        center: { latitude: 6.5244, longitude: 3.3792 },
        radius: 50000,
      },
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": GOOGLE_PLACES_KEY,
      // Field mask to keep response small. :contentReference[oaicite:5]{index=5}
      "X-Goog-FieldMask":
        "suggestions.placePrediction.placeId,suggestions.placePrediction.text.text,suggestions.placePrediction.structuredFormat",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) {
    const msg = data?.error?.message || "Places autocomplete failed";
    throw new Error(msg);
  }

  const suggestions = (data?.suggestions || [])
    .map((s) => s.placePrediction)
    .filter(Boolean)
    .map((p) => ({
      placeId: p.placeId,
      fullText: p.text?.text || "",
      mainText: p.structuredFormat?.mainText?.text || p.text?.text || "",
      secondaryText: p.structuredFormat?.secondaryText?.text || "",
    }));

  return suggestions;
}

export default function AddressAutocompleteOneField() {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: { address: "" },
  });

  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const sessionTokenRef = useRef(makeSessionToken());
  const debounceRef = useRef(null);
  const lastQueryRef = useRef("");

  const onSubmit = (values) => {
    console.log("Submitted address:", values.address);
  };

  const runAutocomplete = useMemo(() => {
    return async (text) => {
      const q = text.trim();
      lastQueryRef.current = q;

      if (q.length < 3) {
        setSuggestions([]);
        setOpen(false);
        setLoading(false);
        return;
      }

      setLoading(true);
      setOpen(true);

      try {
        const items = await fetchPlaceSuggestions({
          input: q,
          sessionToken: sessionTokenRef.current,
        });

        // prevent stale responses from overwriting newer typing
        if (lastQueryRef.current === q) {
          setSuggestions(items);
        }
      } catch (e) {
        if (lastQueryRef.current === q) {
          setSuggestions([]);
        }
      } finally {
        if (lastQueryRef.current === q) setLoading(false);
      }
    };
  }, []);

  const onType = (text) => {
    setValue("address", text, { shouldDirty: true });

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => runAutocomplete(text), 250);
  };

  const pickSuggestion = (item) => {
    setValue("address", item.fullText, { shouldDirty: true });
    setOpen(false);
    setSuggestions([]);

    // End this session after user selection; generate a fresh token for the next search session. :contentReference[oaicite:6]{index=6}
    sessionTokenRef.current = makeSessionToken();

    console.log("Picked placeId:", item.placeId);
    // Next step (optional): call Place Details (New) using placeId if you need lat/lng, etc.
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1, paddingVertical: 11, justifyContent: "flex-start" }}
    >
      <Controller
        control={control}
        name="address"
        render={({ field: { value } }) => (
          <View style={{ gap: 8 }}>
            <TextInput
              value={value}
              onChangeText={onType}
              placeholder="Start typing your address…"
              autoCapitalize="words"
              style={{
                flex: 1,
                backgroundColor: '#888',
                fontSize: 16,
                height: 22,
                width: '100%'
              }}
              onFocus={() => value?.trim()?.length >= 3 && setOpen(true)}
            />

            {open && (
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#444",
                  borderRadius: 12,
                  overflow: "hidden",
                flex: 1,
                }}
              >
                {loading ? (
                  <View style={{ padding: 12, flexDirection: "row", gap: 10, alignItems: "center" }}>
                    <ActivityIndicator />
                    <Text>Searching…</Text>
                  </View>
                ) : suggestions.length === 0 ? (
                  <View style={{ padding: 12, }}>
                    <Text>No suggestions yet</Text>
                  </View>
                ) : (
                  <FlatList
                    keyboardShouldPersistTaps="handled"
                    data={suggestions}
                    keyExtractor={(item) => item.placeId}
                    renderItem={({ item }) => (
                      <Pressable
                        onPress={() => pickSuggestion(item)}
                        style={{
                          padding: 12,
                          borderTopWidth: 1,
                          borderTopColor: "#333",
                        }}
                      >
                        <Text style={{ fontSize: 15, fontWeight: "600" }}>
                          {item.mainText}
                        </Text>
                        {!!item.secondaryText && (
                          <Text style={{ opacity: 0.8 }}>{item.secondaryText}</Text>
                        )}
                      </Pressable>
                    )}
                  />
                )}
              </View>
            )}

 
          </View>
        )}
      />
    </KeyboardAvoidingView>
  );
}