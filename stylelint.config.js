export default {
  rules: {
    "at-rule-no-unknown": [true, {
      ignoreAtRules: [
        "tailwind",
        "layer",
        "apply",
        "variants",
        "responsive",
        "screen",
        "theme"
      ]
    }]
  }
}