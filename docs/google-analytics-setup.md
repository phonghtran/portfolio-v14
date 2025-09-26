# Google Analytics Setup Guide

## 🎯 **Overview**

This guide will help you set up Google Analytics 4 (GA4) for your portfolio website to track user interactions and gather insights about your visitors.

## 📊 **Step 1: Create Google Analytics Account**

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Start measuring"
4. Create a new account:
   - **Account Name**: "Phong Portfolio" (or your preferred name)
   - Choose your data sharing settings
5. Create a property:
   - **Property Name**: "phonghtran.com" (or your domain)
   - **Reporting Time Zone**: Your timezone
   - **Currency**: Your preferred currency
6. Choose "Web" as your platform
7. Set up your web stream:
   - **Website URL**: Your deployed Firebase URL or custom domain
   - **Stream Name**: "Portfolio Website"

## 🔑 **Step 2: Get Your Measurement ID**

After creating your property, you'll get a **Measurement ID** that looks like:

```
G-XXXXXXXXXX
```

Copy this ID - you'll need it for the next step.

## ⚙️ **Step 3: Update Environment Variables**

1. Open your `.env` file in the project root
2. Replace the placeholder with your actual Measurement ID:

```bash
# Replace G-XXXXXXXXXX with your actual GA4 Measurement ID
NEXT_PUBLIC_GA_ID=G-1234567890
```

## 🚀 **Step 4: Deploy Your Changes**

The Google Analytics code is already integrated into your portfolio. Just deploy your changes:

```bash
npm run build
firebase deploy --only apphosting
```

## 📈 **What's Being Tracked**

Your portfolio now automatically tracks:

### **Page Views**

- Home page visits
- Case studies page views
- Contact page views
- Project navigation

### **Chat Interactions**

- Messages sent to AI chatbot
- Rate limit hits
- Chat engagement metrics

### **Project Engagement**

- Which projects users view
- Project navigation patterns
- Time spent on projects

### **Audio Interactions** (Ready to implement)

- Audio playback events
- Which project audio gets played
- Audio completion rates

### **UI Interactions** (Ready to implement)

- Theme changes
- Section expansions/collapses
- External link clicks

## 🔍 **Viewing Your Analytics**

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your property
3. Navigate to different reports:
   - **Reports > Engagement > Pages** - See which pages are most popular
   - **Reports > Engagement > Events** - See custom events (chat, projects, etc.)
   - **Reports > Demographics** - Learn about your audience
   - **Reports > Acquisition** - See how users find your site

## 📊 **Custom Events Dashboard**

Create custom reports to track portfolio-specific metrics:

1. Go to **Explore** in GA4
2. Create a **Free Form** report
3. Add these custom events as metrics:
   - `send_message` - Chat interactions
   - `view_project` - Project engagement
   - `play_audio` - Audio engagement
   - `change_theme` - UI preferences

## 🛡️ **Privacy & GDPR Compliance**

Your implementation includes:

- ✅ **No personal data collection** without consent
- ✅ **Anonymized IP addresses** by default in GA4
- ✅ **No tracking if GA_ID is not set**
- ✅ **Client-side only** - respects user preferences

For full GDPR compliance, consider adding:

- Cookie consent banner
- Privacy policy page
- Opt-out mechanism

## 🔧 **Advanced Customization**

### **Add More Event Tracking**

Use the `useAnalytics` hook anywhere in your app:

```tsx
import { useAnalytics } from '@/hooks/use-analytics';

function MyComponent() {
  const analytics = useAnalytics();

  const handleClick = () => {
    analytics.trackExternalLink('https://example.com', 'Portfolio Link');
  };

  return <button onClick={handleClick}>Visit Site</button>;
}
```

### **Track Custom Events**

```tsx
import { event } from '@/components/analytics/google-analytics';

// Track custom interactions
event({
  action: 'download_resume',
  category: 'Engagement',
  label: 'PDF Download',
});
```

## 🎯 **Key Metrics to Watch**

- **Page Views**: Which sections get the most attention
- **Chat Engagement**: How users interact with your AI assistant
- **Project Views**: Which case studies resonate most
- **Session Duration**: How long users spend exploring
- **Bounce Rate**: Percentage of single-page visits
- **Demographics**: Learn about your audience

## 🚨 **Troubleshooting**

### **Analytics Not Working?**

1. Check your `.env` file has the correct `NEXT_PUBLIC_GA_ID`
2. Verify the Measurement ID format: `G-XXXXXXXXXX`
3. Ensure you've deployed after adding the ID
4. Check browser console for JavaScript errors
5. Use GA4's "DebugView" to see real-time events

### **Events Not Showing?**

- Events can take 24-48 hours to appear in standard reports
- Use "Realtime" reports to see immediate activity
- Check "DebugView" in GA4 for live event testing

Your portfolio is now equipped with comprehensive analytics to help you understand your audience and optimize your online presence! 📊
