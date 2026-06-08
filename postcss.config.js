export default {
  plugins: {
    // Convert CSS Logical Properties (padding-inline, padding-block, etc.)
    // to physical equivalents (padding-left/right, padding-top/bottom).
    // Tailwind v4 uses logical properties; Edge has inconsistent support for them.
    'postcss-logical': {},
  },
}
