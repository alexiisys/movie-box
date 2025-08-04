import * as Application from 'expo-application';
import * as Device from 'expo-device';
import { AppEventsLogger, Settings } from 'react-native-fbsdk-next';

/**
 * Initialize Facebook SDK for attribution tracking
 * This enables tracking of app installs
 */
export const initializeFacebookAttribution = async () => {
  try {
    // Facebook SDK initialization
    Settings.initializeSDK();

    // Enable advertiser tracking for attribution
    // Only enable if user has already granted permission
    if (await Settings.getAdvertiserTrackingEnabled()) {
      await Settings.setAdvertiserTrackingEnabled(true);
    }

    console.log('Facebook attribution initialized successfully');
  } catch (error) {
    console.warn('Facebook attribution initialization failed:', error);
  }
};

/**
 * Track install attribution events
 * Called on first app launch to track install source
 */
export const trackInstallAttribution = async () => {
  try {
    // Track install events for attribution
    AppEventsLogger.logEvent('fb_mobile_first_day_retention');

    // Get device info for attribution
    const deviceInfo = {
      platform: Device.osName,
      version: Device.osVersion,
      model: Device.modelName,
      bundleId: Application.applicationId,
    };

    console.log('Install attribution tracked:', deviceInfo);
  } catch (error) {
    console.warn('Failed to track install attribution:', error);
  }
};

/**
 * Track app launch for attribution
 * Called on each app launch
 */
export const trackAppLaunch = async () => {
  try {
    // Log app activation event for tracking
    AppEventsLogger.logEvent('fb_mobile_activate_app');
  } catch (error) {
    console.warn('Failed to track app launch:', error);
  }
};
