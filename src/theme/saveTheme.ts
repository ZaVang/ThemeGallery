export interface SaveThemeInput {
  fileName: string;
  markdown: string;
}

export interface SaveThemeResult {
  fileName: string;
  filePath: string;
}

type SaveThemeResponseBody = Partial<SaveThemeResult> & {
  message?: string;
};

export type SaveThemeFetcher = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Pick<Response, 'ok' | 'json'>>;

async function readResponseBody(response: Pick<Response, 'json'>): Promise<SaveThemeResponseBody> {
  try {
    return (await response.json()) as SaveThemeResponseBody;
  } catch {
    return {};
  }
}

export async function saveThemeMarkdown(
  input: SaveThemeInput,
  fetcher: SaveThemeFetcher = globalThis.fetch,
): Promise<SaveThemeResult> {
  const response = await fetcher('/api/themes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  const body = await readResponseBody(response);

  if (!response.ok) {
    throw new Error(body.message ?? 'Unable to save theme Markdown.');
  }

  if (typeof body.fileName !== 'string' || typeof body.filePath !== 'string') {
    throw new Error('Theme save response was incomplete.');
  }

  return {
    fileName: body.fileName,
    filePath: body.filePath,
  };
}
