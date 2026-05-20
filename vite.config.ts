import { Buffer } from 'node:buffer';
import react from '@vitejs/plugin-react';
import type { ServerResponse } from 'node:http';
import { defineConfig } from 'vitest/config';
import type { Plugin } from 'vite';
import {
  PaletteSaveError,
  savePaletteMarkdownToLibrary,
  type LocalPaletteSaveInput,
} from './src/palette/localPaletteSave';

function readJsonBody(request: NodeJS.ReadableStream): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const chunks: string[] = [];

    request.on('data', (chunk: unknown) => {
      chunks.push(Buffer.isBuffer(chunk) ? chunk.toString('utf8') : String(chunk));
    });
    request.on('error', reject);
    request.on('end', () => {
      try {
        resolve(JSON.parse(chunks.join('') || '{}'));
      } catch {
        reject(new PaletteSaveError(400, 'Request body must be valid JSON.'));
      }
    });
  });
}

function writeJson(response: ServerResponse, statusCode: number, body: Record<string, unknown>): void {
  response.statusCode = statusCode;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.end(JSON.stringify(body));
}

function localPaletteSavePlugin(): Plugin {
  return {
    name: 'theme-gallery-local-palette-save',
    configureServer(server) {
      server.middlewares.use('/api/palettes', async (request, response) => {
        if (request.method !== 'POST') {
          writeJson(response, 405, { message: 'Use POST to save a palette.' });
          return;
        }

        try {
          const body = await readJsonBody(request);
          const result = await savePaletteMarkdownToLibrary(body as LocalPaletteSaveInput, server.config.root);
          writeJson(response, 201, {
            fileName: result.fileName,
            filePath: result.filePath,
          });
        } catch (error) {
          const statusCode = error instanceof PaletteSaveError ? error.statusCode : 500;
          const message = error instanceof Error ? error.message : 'Unable to save palette Markdown.';
          writeJson(response, statusCode, { message });
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), localPaletteSavePlugin()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
});
