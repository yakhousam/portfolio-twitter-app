export async function searchHashtag(hashtag: string, signal: AbortSignal) {
  try {
    const response = await fetch('api/search/' + hashtag, { signal });
    const reader = response?.body?.getReader();

    return reader;
  } catch (error) {
    console.error(error);
    return;
  }
}
