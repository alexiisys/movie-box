import { useEffect, useState } from 'react';

const fetchData = async (url: string) => {
  try {
    const response = await fetch(url);
    const result = response.status;
    return result === 200;
  } catch {
    return false;
  }
};

export const useIsWebView = (url: string) => {
  const [isWebView, setIsWebView] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentURL, setCurrentURL] = useState<string>(url);
  useEffect(() => {
    fetchData(url)
      .then((res) => {
        setIsWebView(res);
        setCurrentURL(url);
      })
      .finally(() => setIsLoading(false));
  }, [url]);

  return [currentURL, isLoading, isWebView];
};
