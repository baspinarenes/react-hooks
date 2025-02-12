import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    dts({
      tsconfigPath: "./tsconfig.json",
      rollupTypes: true,
    }),
    tsconfigPaths(),
  ],
  build: {
    outDir: "dist",
    lib: {
      entry: path.resolve(__dirname, "lib/index.ts"),
      name: "@enesbaspinar/react-hooks",
      fileName: (format, entryName) =>
        format === "cjs" ? `${entryName}.cjs` : `${entryName}.js`,
      formats: ["es", "cjs"],
    },
    sourcemap: true,
    emptyOutDir: true,
    rollupOptions: {
      external: ["react"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
});
