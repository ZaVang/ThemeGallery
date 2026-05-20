export interface SavePaletteInput {
  fileName: string;
  markdown: string;
}

export interface SavePaletteResult {
  fileName: string;
  filePath: string;
}

type SavePaletteResponseBody = Partial<SavePaletteResult> & {
  message?: string;
};

export type SavePaletteFetcher = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Pick<Response, 'ok' | 'json'>>;

async function readResponseBody(response: Pick<Response, 'json'>): Promise<SavePaletteResponseBody> {
  try {
    return (await response.json()) as SavePaletteResponseBody;
  } catch {
    return {};
  }
}

export async function savePaletteMarkdown(
  input: SavePaletteInput,
  fetcher: SavePaletteFetcher = globalThis.fetch,
): Promise<SavePaletteResult> {
  const response = await fetcher('/api/palettes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  const body = await readResponseBody(response);

  if (!response.ok) {
    throw new Error(body.message ?? 'Unable to save palette Markdown.');
  }

  if (typeof body.fileName !== 'string' || typeof body.filePath !== 'string') {
    throw new Error('Palette save response was incomplete.');
  }

  return {
    fileName: body.fileName,
    filePath: body.filePath,
  };
}
