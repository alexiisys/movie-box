import { AppEventsLogger, Settings } from 'react-native-fbsdk-next';

/**
 * Facebook Attribution Helper Functions
 * Handles Facebook SDK initialization and attribution event tracking
 * Note: This implementation focuses on install attribution without user tracking permissions
 */

// Facebook attribution events
export const FB_ATTRIBUTION_EVENTS = {
  // Standard attribution events
  APP_LAUNCH: 'fb_mobile_app_launch',
  FIRST_OPEN: 'fb_mobile_first_day_retention',
  SEARCH: 'fb_mobile_search',
  VIEW_CONTENT: 'fb_mobile_content_view',
  ADD_TO_WISHLIST: 'fb_mobile_add_to_wishlist',

  // Custom app-specific events
  MOVIE_ADDED: 'movie_added',
  MOVIE_VIEWED: 'movie_viewed',
  MOVIE_SEARCHED: 'movie_searched',
  MOVIE_RATED: 'movie_rated',
  MOVIE_SHARED: 'movie_shared',
} as const;

// Parameters for events
export const FB_EVENT_PARAMS = {
  CONTENT_TYPE: 'fb_content_type',
  CONTENT_ID: 'fb_content_id',
  SEARCH_STRING: 'fb_search_string',
  SUCCESS: 'fb_success',
  CURRENCY: 'fb_currency',
  VALUE_TO_SUM: 'fb_value_to_sum',
} as const;

/**
 * Initialize Facebook SDK for attribution tracking
 * Note: Removed tracking permission requests to avoid NSUserTrackingUsageDescription requirement
 */
export const initializeFacebookAttribution = async (): Promise<void> => {
  try {
    console.log('📱 Initializing Facebook Attribution...');

    // Initialize Facebook SDK without requesting tracking permissions
    Settings.initializeSDK();

    // Set advertiser tracking to false to comply with App Store requirements
    await Settings.setAdvertiserTrackingEnabled(false);
    console.log('📱 Facebook advertiser tracking disabled (compliant mode)');

    // SDK will automatically handle app activation for install attribution
    console.log('✅ Facebook SDK initialized for install attribution only');
  } catch (error) {
    console.error('❌ Facebook Attribution initialization failed:', error);
  }
};

/**
 * Track app launch event for attribution
 */
export const trackAppLaunch = async (): Promise<void> => {
  try {
    AppEventsLogger.logEvent(FB_ATTRIBUTION_EVENTS.APP_LAUNCH);
    console.log('📊 Facebook: App launch tracked');
  } catch (error) {
    console.error('❌ Facebook app launch tracking failed:', error);
  }
};

/**
 * Track first app open for retention attribution
 */
export const trackFirstAppOpen = async (): Promise<void> => {
  try {
    AppEventsLogger.logEvent(FB_ATTRIBUTION_EVENTS.FIRST_OPEN);
    console.log('📊 Facebook: First app open tracked');
  } catch (error) {
    console.error('❌ Facebook first open tracking failed:', error);
  }
};

/**
 * Track content view events (movie viewing)
 */
export const trackContentView = async (params: {
  contentType: string;
  contentId: string;
  currency?: string;
  value?: number;
}): Promise<void> => {
  try {
    const eventParams = {
      [FB_EVENT_PARAMS.CONTENT_TYPE]: params.contentType,
      [FB_EVENT_PARAMS.CONTENT_ID]: params.contentId,
      ...(params.currency && { [FB_EVENT_PARAMS.CURRENCY]: params.currency }),
      ...(params.value && { [FB_EVENT_PARAMS.VALUE_TO_SUM]: params.value }),
    };

    AppEventsLogger.logEvent(
      FB_ATTRIBUTION_EVENTS.VIEW_CONTENT,
      params.value || 0,
      eventParams
    );
    console.log('📊 Facebook: Content view tracked', params);
  } catch (error) {
    console.error('❌ Facebook content view tracking failed:', error);
  }
};

/**
 * Track search events
 */
export const trackSearch = async (searchString: string): Promise<void> => {
  try {
    const eventParams = {
      [FB_EVENT_PARAMS.SEARCH_STRING]: searchString,
      [FB_EVENT_PARAMS.CONTENT_TYPE]: 'movie',
    };

    AppEventsLogger.logEvent(FB_ATTRIBUTION_EVENTS.SEARCH, 1, eventParams);
    console.log('📊 Facebook: Search tracked', searchString);
  } catch (error) {
    console.error('❌ Facebook search tracking failed:', error);
  }
};

/**
 * Track movie-specific events
 */
export const trackMovieEvent = async (
  eventType: 'added' | 'viewed' | 'searched' | 'rated' | 'shared',
  movieData: {
    movieId: string;
    movieTitle?: string;
    rating?: number;
    genre?: string;
  }
): Promise<void> => {
  try {
    let eventName: string;

    switch (eventType) {
      case 'added':
        eventName = FB_ATTRIBUTION_EVENTS.MOVIE_ADDED;
        break;
      case 'viewed':
        eventName = FB_ATTRIBUTION_EVENTS.MOVIE_VIEWED;
        break;
      case 'searched':
        eventName = FB_ATTRIBUTION_EVENTS.MOVIE_SEARCHED;
        break;
      case 'rated':
        eventName = FB_ATTRIBUTION_EVENTS.MOVIE_RATED;
        break;
      case 'shared':
        eventName = FB_ATTRIBUTION_EVENTS.MOVIE_SHARED;
        break;
      default:
        throw new Error(`Unknown movie event type: ${eventType}`);
    }

    const eventParams = {
      [FB_EVENT_PARAMS.CONTENT_TYPE]: 'movie',
      [FB_EVENT_PARAMS.CONTENT_ID]: movieData.movieId,
      ...(movieData.movieTitle && { movie_title: movieData.movieTitle }),
      ...(movieData.rating && { rating: movieData.rating }),
      ...(movieData.genre && { genre: movieData.genre }),
    };

    AppEventsLogger.logEvent(eventName, 1, eventParams);
    console.log(`📊 Facebook: Movie ${eventType} tracked`, movieData);
  } catch (error) {
    console.error(`❌ Facebook movie ${eventType} tracking failed:`, error);
  }
};

/**
 * Track custom events with parameters
 */
export const trackCustomEvent = async (
  eventName: string,
  value?: number,
  parameters?: Record<string, string | number>
): Promise<void> => {
  try {
    if (parameters) {
      AppEventsLogger.logEvent(eventName, value || 0, parameters);
    } else {
      AppEventsLogger.logEvent(eventName, value || 0);
    }
    console.log('📊 Facebook: Custom event tracked', {
      eventName,
      value,
      parameters,
    });
  } catch (error) {
    console.error('❌ Facebook custom event tracking failed:', error);
  }
};

/**
 * Track user properties for attribution
 */
export const setUserProperties = async (
  properties: Record<string, string>
): Promise<void> => {
  try {
    Object.entries(properties).forEach(([key, value]) => {
      AppEventsLogger.setUserData({ [key]: value });
    });
    console.log('📊 Facebook: User properties set', properties);
  } catch (error) {
    console.error('❌ Facebook user properties setting failed:', error);
  }
};

/**
 * Get Facebook attribution data
 */
export const getAttributionData = async (): Promise<any> => {
  try {
    // Note: This method depends on Facebook SDK version and may need adjustment
    console.log('📊 Facebook: Getting attribution data...');
    return null; // Placeholder - actual implementation depends on specific attribution needs
  } catch (error) {
    console.error('❌ Facebook attribution data retrieval failed:', error);
    return null;
  }
};

/**
 * Utility function to check if Facebook SDK is available
 */
export const isFacebookSDKAvailable = (): boolean => {
  try {
    return !!(Settings && AppEventsLogger);
  } catch {
    return false;
  }
};

/**
 * Enable/disable Facebook attribution tracking
 */
export const setAttributionEnabled = async (
  enabled: boolean
): Promise<void> => {
  try {
    await Settings.setAdvertiserTrackingEnabled(enabled);
    console.log(
      `📊 Facebook: Attribution tracking ${enabled ? 'enabled' : 'disabled'}`
    );
  } catch (error) {
    console.error('❌ Facebook attribution tracking toggle failed:', error);
  }
};
