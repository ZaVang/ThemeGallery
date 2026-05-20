export const assetLibraryRoot = 'assets';
export const designAssetsDir = `${assetLibraryRoot}/designs`;
export const colorAssetsDir = `${assetLibraryRoot}/colors`;

export function designAssetPath(fileName: string): string {
  return `${designAssetsDir}/${fileName}`;
}

export function colorAssetPath(fileName: string): string {
  return `${colorAssetsDir}/${fileName}`;
}
