import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Check,
  Clock3,
  CloudRain,
  Coffee,
  Droplets,
  Info,
  Languages,
  MapPin,
  Plus,
  RefreshCw,
  Search,
  Sprout,
  Thermometer,
  Wheat,
  Wind,
} from 'lucide-react'
import './App.css'
import PlantOrWait from './components/PlantOrWait'
import RainChart from './components/RainChart'
import plantingImage from './assets/planting.jpg'

const API_URL = 'http://localhost:5002/api/mock/crops/1/health'
const sampleRainfall = [0.2, 0.1, 2.4, 6.1, 3.8, 0.4, 0.1, 0, 0, 0.2, 0, 0.1, 0, 0]
const sampleDrySpellRisk = 'medium'
const sampleRainfallReference = 2

const translations = {
  en: {
    farmCompanion: 'Your farm companion',
    myCrops: 'My crops',
    help: 'Help & guidance',
    switchLanguage: 'አማርኛ',

    welcomeEyebrow: 'BETTER DECISIONS FOR YOUR FARM',
    welcomeTitle1: 'Know when',
    welcomeTitle2: "it's time to plant.",
    welcomeText:
      'Check the weather, keep track of your crops, and get information to help you decide when to plant.',
    setupFarm: "Let's set up your farm",
    howItWorks: 'How it works',
    chooseCrops: 'Choose your crops',
    chooseCropsText: 'Start with the crops growing on your farm.',
    addLocation: 'Add your location',
    addLocationText: 'Help us work toward information relevant to your area.',
    understandReadings: 'Understand your readings',
    understandReadingsText: 'See your available crop information in one place.',
    photoCredit: 'Photo: Ricardo IV Tamayo / Unsplash',

    locationEyebrow: "LET'S GET TO KNOW YOUR FARM",
    locationTitle: 'Where is your farm?',
    locationText:
      'This helps us prepare for more locally relevant crop and weather information. You can update these details later.',
    region: 'Region',
    zone: 'Zone',
    woreda: 'Woreda',
    village: 'Kebele or village',
    optional: '(optional)',
    regionHint: 'e.g. Oromia',
    zoneHint: 'Enter your zone',
    woredaHint: 'Enter your woreda',
    villageHint: 'Enter your kebele or village',
    atFarm: 'At the farm right now?',
    atFarmText:
      "You can optionally use your device location. Only do this if you're at the farm.",
    useLocation: 'Use my location',
    coordinatesCaptured:
      'Location coordinates captured for this session. They are not sent to the backend yet.',
    locationUnavailable:
      'Location detection is unavailable in this browser. You can enter the farm area manually.',
    locationDenied:
      'We could not access your location. You can enter the farm area manually.',
    locationRequired:
      'Please enter at least your region and woreda, or use your device location.',
    locationPrivacy:
      "For this prototype, the location stays in this page's current session and is not sent to the backend or saved to an account.",
    continueCrops: 'Continue to crops',
    back: 'Back',
    stepLocation: 'Farm location',
    stepCrops: 'Choose crops',

    cropsEyebrow: 'STEP 2 · YOUR FARM',
    cropsTitle: 'What do you grow?',
    cropsText: 'Choose all the crops you grow. You can monitor more than one.',
    wheat: 'Wheat',
    wheatText: 'Monitor wheat conditions',
    coffee: 'Coffee',
    coffeeSelectionText: 'Monitor coffee conditions',
    teff: 'Teff',
    teffText: "We're planning this for a later version.",
    comingSoon: 'Coming later',
    yourLocation: 'Your farm location',
    edit: 'Edit',
    viewCrops: 'View my crops',

    dashboardEyebrow: 'YOUR FARM AT A GLANCE',
    helloFarmer: 'Hello, farmer!',
    editLocation: 'Edit location',
    monitoring: 'CURRENTLY MONITORING',
    readingsIntro: 'Here are the readings currently available for this crop.',
    checkingStatus: 'Checking status',
    needsAttention: 'Needs attention',
    checkConditions: 'Check conditions',
    reportedHealthy: 'Reported healthy',
    statusUnknown: 'Status not confirmed',
    wheatReadings: 'Your crop readings',
    readingsText: 'Values provided by the current backend endpoint.',
    refresh: 'Refresh',
    refreshing: 'Refreshing...',
    soilMoisture: 'Soil moisture',
    temperature: 'Temperature',
    humidity: 'Humidity',
    windSpeed: 'Wind speed',
    rainfall: 'Rainfall',
    lastUpdated: 'Last updated:',
    sampleNote:
      'These are sample API readings. Measurement units and crop-specific thresholds still need to be confirmed.',
    criticalTitle: 'This reading needs a closer look',
    criticalText:
      'The sample API reports a critical status. Because this is test data and the measurement units and thresholds are not confirmed, check the data before making farm decisions.',
    loadingTitle: 'Getting your crop information',
    loadingText:
      'Please wait while Nebula requests the latest available data.',
    loadErrorTitle: "We couldn't load your readings",
    loadErrorText: 'Check that the backend is running, then try again.',
    tryAgain: 'Try again',
    coffeeEyebrow: 'COFFEE MONITORING',
    coffeeTitle: "Let's connect your coffee data",
    coffeeText:
      'Coffee is selectable in this prototype, but the backend currently provides sample readings for wheat only. No coffee measurements are being invented or shown.',
    seeNext: "See what's next",
    prototype: 'Early prototype',

    guidanceEyebrow: 'HERE TO HELP',
    guidanceTitle: 'Help & guidance',
    guidanceIntro:
      'Clear information helps you make better-informed decisions about your farm.',
    checkWheat: 'Check your wheat readings',
    wheatGuidance:
      'The current sample API returns the status:',
    wheatGuidance2:
      'These are test readings, and we have not yet confirmed their units or the rules used to assign that status.',
    wheatGuidance3:
      'Before taking action, verify the measurements and consult trusted local agricultural guidance if you are concerned about your crop.',
    guidanceNotReady:
      'Crop-specific guidance is still being connected',
    guidanceNotReadyText:
      'The prototype does not yet have confirmed readings and recommendations for this crop. We will add these when the relevant data and guidance are available.',
    howNebulaHelps: 'How Nebula will help',
    understandNumbers: 'Understand the numbers',
    understandNumbersText:
      "We'll explain measurements in familiar language once their units and meaning have been confirmed.",
    localConditions: 'Learn about local conditions',
    localConditionsText:
      'Location-aware weather information can be added when a suitable data source is connected.',
    askForHelp: 'Know when to ask for help',
    askForHelpText:
      'When readings are unclear or concerning, confirm them with a trusted local agricultural extension professional.',
    backToCrops: 'Back to my crops',
    noLocation: 'Location not added',
    deviceLocationRecorded: 'Device location recorded',
    locationSavedCoordinates: 'Coordinates recorded for this session.',
    unitsNotice: 'Measurement units have not been confirmed.',
    plantNow: 'Plant now',
    wait: 'Wait',
    verdictQuestion: 'What should you do?',
    sampleData: 'Sample data',
    rainHistory: 'Last 14 days of rain',
    rainChartCaption: 'A few rainy days then a dry gap can be a false start.',
    rainUnit: 'mm of rain',
    chartDaysAgo: 'Days ago',
    chartReference: 'Sample planting threshold',
    highestRainfallDay: 'Highest sample day',
    dayAgo: 'day ago',
    daysAgo: 'days ago',
    outlookHeading: 'Illustrative outlook: next 14 days',
    drySpellRisk: 'Dry-spell risk',
    riskMedium: 'Medium',
    outlookDemoNote: 'Example only. A weather forecast is not connected yet.',
    riskSelectorHeading: 'How do you want to weigh planting risk?',
    riskBold: 'Bold',
    riskBalanced: 'Balanced',
    riskCareful: 'Careful',
    riskBoldDescription: 'More willing to plant when the outlook is uncertain.',
    riskBalancedDescription: 'Balance the chance to plant with the risk of a dry spell.',
    riskCarefulDescription: 'Wait for stronger signs that the rains will continue.',
    riskSelectionNote: 'Your choice changes this sample decision only.',
    boldDecisionReason: 'This example accepts medium dry-spell risk. It is not a forecast or a planting recommendation.',
    balancedDecisionReason: 'With medium dry-spell risk in this example, a balanced choice is to wait for clearer signs.',
    carefulDecisionReason: 'With medium dry-spell risk in this example, a careful choice is to wait for stronger signs.',
    metricDry: 'Dry',
    metricGood: 'Good',
    metricWet: 'Wet',
    metricCool: 'Cool',
    metricWarm: 'Warm',
    metricVeryWarm: 'Very warm',
    metricHumid: 'Humid',
    metricCalm: 'Calm',
    metricModerate: 'Moderate',
    metricStrong: 'Strong',
    metricLow: 'Low',
    metricHigh: 'High',
    sampleReading: 'Sample reading',
  },

  am: {
    farmCompanion: 'ለእርሻዎ አጋዥ',
    myCrops: 'ሰብሎቼ',
    help: 'እገዛና መመሪያ',
    switchLanguage: 'English',

    welcomeEyebrow: 'ለእርሻዎ የተሻሉ ውሳኔዎች',
    welcomeTitle1: 'መቼ መዝራት',
    welcomeTitle2: 'እንደሚገባ ይወቁ።',
    welcomeText:
      'የአየር ሁኔታንና የሰብልዎን ሁኔታ ይከታተሉ። መቼ መዝራት እንደሚሻል ለመወሰን የሚረዳዎትን መረጃ ያግኙ።',
    setupFarm: 'እርሻዎን እናዘጋጅ',
    howItWorks: 'እንዴት ይሰራል?',
    chooseCrops: 'ሰብሎችዎን ይምረጡ',
    chooseCropsText: 'በእርሻዎ ላይ የሚያመርቷቸውን ሰብሎች ይምረጡ።',
    addLocation: 'የእርሻዎን አካባቢ ያስገቡ',
    addLocationText: 'ለአካባቢዎ የሚስማማ መረጃ እንድናቀርብ ይረዳናል።',
    understandReadings: 'የሰብልዎን መረጃ ይረዱ',
    understandReadingsText: 'ስለ ሰብሎችዎ ያለውን መረጃ በአንድ ቦታ ይመልከቱ።',
    photoCredit: 'ፎቶ፦ Ricardo IV Tamayo / Unsplash',

    locationEyebrow: 'ስለ እርሻዎ ጥቂት እንወቅ',
    locationTitle: 'እርሻዎ የት ይገኛል?',
    locationText:
      'የእርሻዎን አካባቢ ማወቅ ለአካባቢዎ የሚስማማ የሰብልና የአየር ሁኔታ መረጃ ለማቅረብ ይረዳናል። ይህን መረጃ በኋላ መቀየር ይችላሉ።',
    region: 'ክልል',
    zone: 'ዞን',
    woreda: 'ወረዳ',
    village: 'ቀበሌ ወይም መንደር',
    optional: '(አማራጭ)',
    regionHint: 'ለምሳሌ፣ ኦሮሚያ',
    zoneHint: 'ዞኑን ያስገቡ',
    woredaHint: 'ወረዳውን ያስገቡ',
    villageHint: 'ቀበሌውን ወይም መንደሩን ያስገቡ',
    atFarm: 'አሁን በእርሻዎ ላይ ነዎት?',
    atFarmText:
      'በእርሻዎ ላይ ከሆኑ፣ የስልክዎን የአካባቢ መረጃ መጠቀም ይችላሉ።',
    useLocation: 'የአሁኑን አካባቢ ይጠቀሙ',
    coordinatesCaptured:
      'የአካባቢ መረጃው ለዚህ ጊዜያዊ ክፍለ ጊዜ ተመዝግቧል፤ ወደ ስርዓቱ አልተላከም።',
    locationUnavailable:
      'በዚህ አሳሽ የስልክ አካባቢን ማወቅ አልተቻለም። የእርሻዎን አካባቢ በእጅ ማስገባት ይችላሉ።',
    locationDenied:
      'የስልክዎን አካባቢ ማግኘት አልቻልንም። የእርሻዎን አካባቢ በእጅ ማስገባት ይችላሉ።',
    locationRequired:
      'እባክዎ ክልልና ወረዳ ያስገቡ፣ ወይም የስልክዎን አካባቢ ይጠቀሙ።',
    locationPrivacy:
      'ይህ የሙከራ ስሪት ነው። የአካባቢ መረጃዎ በዚህ ገጽ ላይ ብቻ ይቆያል፤ ወደ ስርዓቱ አይላክም እና በመለያዎ ውስጥ አይቀመጥም።',
    continueCrops: 'ወደ ሰብሎች ይቀጥሉ',
    back: 'ወደ ኋላ',
    stepLocation: 'የእርሻ አካባቢ',
    stepCrops: 'ሰብሎችን ይምረጡ',

    cropsEyebrow: 'ደረጃ 2 · ስለ እርሻዎ',
    cropsTitle: 'ምን ሰብሎች ያመርታሉ?',
    cropsText: 'የሚያመርቷቸውን ሰብሎች ሁሉ ይምረጡ። ከአንድ በላይ መምረጥ ይችላሉ።',
    wheat: 'ስንዴ',
    wheatText: 'የስንዴዎን ሁኔታ ይከታተሉ',
    coffee: 'ቡና',
    coffeeSelectionText: 'የቡናዎን ሁኔታ ይከታተሉ',
    teff: 'ጤፍ',
    teffText: 'ጤፍን በኋላ እናካትታለን።',
    comingSoon: 'በቅርቡ',
    yourLocation: 'የእርሻዎ አካባቢ',
    edit: 'ያስተካክሉ',
    viewCrops: 'ሰብሎቼን ይመልከቱ',

    dashboardEyebrow: 'የእርሻዎ አጠቃላይ እይታ',
    helloFarmer: 'እንኳን ደህና መጡ!',
    editLocation: 'አካባቢውን ያስተካክሉ',
    monitoring: 'እየተከታተልን ያለነው',
    readingsIntro: 'ለዚህ ሰብል ያለን የቅርብ ጊዜ መረጃ እነሆ።',
    checkingStatus: 'ሁኔታውን እያረጋገጥን ነው',
    needsAttention: 'ተጨማሪ ትኩረት ያስፈልጋል',
    checkConditions: 'ሁኔታውን ይመርምሩ',
    reportedHealthy: 'ጥሩ ሁኔታ መሆኑ ተገልጿል',
    statusUnknown: 'ሁኔታው አልታወቀም',
    wheatReadings: 'የሰብል መረጃ',
    readingsText: 'ከአሁኑ የመረጃ ምንጭ የተገኘ ውጤት።',
    refresh: 'እንደገና ያድሱ',
    refreshing: 'በማደስ ላይ…',
    soilMoisture: 'የአፈር እርጥበት',
    temperature: 'የሙቀት መጠን',
    humidity: 'የአየር እርጥበት',
    windSpeed: 'የነፋስ ፍጥነት',
    rainfall: 'የዝናብ መጠን',
    lastUpdated: 'የመጨረሻ የዝማኔ ጊዜ፦',
    sampleNote:
      'እነዚህ የሙከራ መረጃዎች ናቸው። የመለኪያ አሃዶቹና ለሰብሎቹ የሚስማሙ ገደቦች ገና አልተረጋገጡም።',
    criticalTitle: 'ይህ ውጤት ተጨማሪ ማረጋገጫ ይፈልጋል',
    criticalText:
      'የሙከራ መረጃው ሰብሉ አሳሳቢ ሁኔታ ላይ እንዳለ ያሳያል። ሆኖም ይህ መረጃ የሙከራ ስለሆነና አሃዶቹና ገደቦቹ ስላልተረጋገጡ፣ በእርሻ ላይ ውሳኔ ከመወሰንዎ በፊት ውጤቱን ያረጋግጡ።',
    loadingTitle: 'የሰብልዎን መረጃ እያመጣን ነው',
    loadingText: 'የሚገኘውን የቅርብ ጊዜ መረጃ እስክናመጣ ይጠብቁ።',
    loadErrorTitle: 'የሰብልዎን መረጃ ማግኘት አልቻልንም',
    loadErrorText: 'የመረጃ ምንጩ እየሠራ መሆኑን ያረጋግጡና እንደገና ይሞክሩ።',
    tryAgain: 'እንደገና ይሞክሩ',
    coffeeEyebrow: 'የቡና ክትትል',
    coffeeTitle: 'የቡና መረጃን እናገናኝ',
    coffeeText:
      'በዚህ የሙከራ ስሪት ቡናን መምረጥ ይቻላል፤ ነገር ግን አሁን የስንዴ የሙከራ መረጃ ብቻ ይቀርባል። ስለዚህ የቡና መለኪያዎች አልታዩም።',
    seeNext: 'ቀጣዩን ይመልከቱ',
    prototype: 'የሙከራ ስሪት',

    guidanceEyebrow: 'እገዛ ያስፈልግዎታል?',
    guidanceTitle: 'እገዛና መመሪያ',
    guidanceIntro: 'ግልጽ መረጃ ስለ እርሻዎ የተሻለ ውሳኔ እንዲወስኑ ይረዳዎታል።',
    checkWheat: 'የስንዴዎን መረጃ ይመልከቱ',
    wheatGuidance: 'የሙከራ መረጃው የሚያሳየው ሁኔታ፦',
    wheatGuidance2:
      'እነዚህ የሙከራ ውጤቶች ናቸው። የመለኪያ አሃዶቹና ሁኔታውን ለመወሰን የተጠቀሙት መመዘኛዎች ገና አልተረጋገጡም።',
    wheatGuidance3:
      'ምንም እርምጃ ከመውሰድዎ በፊት መለኪያዎቹን ያረጋግጡ። ስለ ሰብልዎ ካሳሰበዎት በአካባቢዎ ያለ የግብርና ባለሙያን ያማክሩ።',
    guidanceNotReady: 'ለዚህ ሰብል የተለየ መመሪያ ገና የለም',
    guidanceNotReadyText:
      'ለዚህ ሰብል የተረጋገጠ መረጃና ምክር በዚህ የሙከራ ስሪት ውስጥ ገና የለም። ተገቢው መረጃ ሲገኝ እናክላለን።',
    howNebulaHelps: 'ኔቡላ እንዴት ሊረዳዎት ይችላል?',
    understandNumbers: 'የመለኪያ ውጤቶችን ይረዱ',
    understandNumbersText:
      'የመለኪያዎቹ አሃድና ትርጉም ሲረጋገጥ፣ ውጤቶቹን በቀላል ቋንቋ እናብራራለን።',
    localConditions: 'የአካባቢዎን ሁኔታ ይከታተሉ',
    localConditionsText:
      'ተገቢ የመረጃ ምንጭ ሲገናኝ፣ ለአካባቢዎ የአየር ሁኔታ መረጃ ማቅረብ ይቻላል።',
    askForHelp: 'መቼ እገዛ መጠየቅ እንዳለብዎ ይወቁ',
    askForHelpText:
      'መለኪያዎቹ ግልጽ ካልሆኑ ወይም አሳሳቢ ከሆኑ፣ በአካባቢዎ ያለ የግብርና ባለሙያን ያማክሩ።',
    backToCrops: 'ወደ ሰብሎቼ ይመለሱ',
    noLocation: 'የእርሻ አካባቢ አልተገለጸም',
    deviceLocationRecorded: 'የስልክ አካባቢ ተመዝግቧል',
    locationSavedCoordinates: 'የአካባቢ መረጃው ለዚህ ክፍለ ጊዜ ተመዝግቧል።',
    unitsNotice: 'የመለኪያ አሃዶቹ ገና አልተረጋገጡም።',
    plantNow: 'አሁን ይዝሩ',
    wait: 'ይጠብቁ',
    verdictQuestion: 'ምን ማድረግ ይሻላል?',
    sampleData: 'የምሳሌ መረጃ',
    rainHistory: 'ባለፉት 14 ቀናት የዝናብ መጠን',
    rainChartCaption: 'ዝናቡ ጥቂት ቀን ከጣለ በኋላ ደረቅ ጊዜ ከመጣ፣ የዝናብ ወቅቱ በትክክል መጀመሩን ያረጋግጡ።',
    rainUnit: 'ዝናብ (ሚሜ)',
    chartDaysAgo: 'ቀናት በፊት',
    chartReference: 'የምሳሌ የመዝራት መነሻ መጠን',
    dayAgo: 'ቀን በፊት',
    daysAgo: 'ቀናት በፊት',
    outlookHeading: 'የምሳሌ የሚቀጥሉት 14 ቀናት ግምት',
    drySpellRisk: 'የደረቅ ጊዜ ዕድል',
    riskMedium: 'መካከለኛ',
    outlookDemoNote: 'ይህ ለማሳያ የቀረበ ምሳሌ ነው፤ እስካሁን የአየር ሁኔታ ትንበያ አልተገናኘም።',
    riskSelectorHeading: 'የመዝራት ውሳኔዎን ሲወስኑ አደጋን ምን ያህል ይቀበላሉ?',
    riskBold: 'ደፋር',
    riskBalanced: 'ሚዛናዊ',
    riskCareful: 'ጥንቃቄ ያለው',
    riskBoldDescription: 'ትንበያው እርግጠኛ ባይሆንም ለመዝራት ዝግጁ ነዎት።',
    riskBalancedDescription: 'የመዝራት ዕድልንና የደረቅ ጊዜ ስጋትን ያመዛዝኑ።',
    riskCarefulDescription: 'ዝናቡ እንደሚቀጥል ግልጽ ምልክት እስኪያዩ ይጠብቁ።',
    riskSelectionNote: 'ምርጫዎ በዚህ ምሳሌ ላይ ያለውን ውሳኔ ብቻ ይቀይራል።',
    boldDecisionReason: 'በዚህ ምሳሌ የደረቅ ጊዜ ዕድሉ መካከለኛ ቢሆንም መዝራት ተመርጧል። ይህ ትንበያም ሆነ የመዝራት ምክር አይደለም።',
    balancedDecisionReason: 'በዚህ ምሳሌ የደረቅ ጊዜ ዕድሉ መካከለኛ ነው። ተጨማሪ ግልጽ ምልክት እስኪታይ መጠበቅ ይሻላል።',
    carefulDecisionReason: 'በዚህ ምሳሌ የደረቅ ጊዜ ዕድሉ መካከለኛ ነው። ዝናቡ እንደሚቀጥል ጠንካራ ማስረጃ እስኪታይ መጠበቅ ይሻላል።',
    metricDry: 'ደረቅ',
    metricGood: 'ጥሩ',
    metricWet: 'እርጥብ',
    metricCool: 'ቀዝቃዛ',
    metricWarm: 'ሞቃት',
    metricVeryWarm: 'በጣም ሞቃት',
    metricHumid: 'እርጥበት ያለው',
    metricCalm: 'ረጋ ያለ',
    metricModerate: 'መካከለኛ',
    metricStrong: 'ከፍተኛ',
    metricLow: 'ዝቅተኛ',
    metricHigh: 'ከፍተኛ',
    sampleReading: 'የምሳሌ መለኪያ',
    highestRainfallDay: 'በምሳሌው ከፍተኛ ዝናብ የዘነበበት ቀን',
  },
}

function App() {
  const [language, setLanguage] = useState(() => {
  return localStorage.getItem('nebula-language') || 'en'
})
function toggleLanguage() {
  const nextLanguage = language === 'en' ? 'am' : 'en'
  localStorage.setItem('nebula-language', nextLanguage)
  setLanguage(nextLanguage)
}
  const t = translations[language]

  const [page, setPage] = useState('welcome')
  const [riskPreference, setRiskPreference] = useState('balanced')
  const [farmLocation, setFarmLocation] = useState({
    region: '',
    zone: '',
    woreda: '',
    village: '',
  })
  const [coordinates, setCoordinates] = useState('')
  const [locationMessage, setLocationMessage] = useState('')
  const [selectedCrops, setSelectedCrops] = useState(['Wheat'])
  const [activeCrop, setActiveCrop] = useState('Wheat')
  const [crop, setCrop] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    if (page !== 'dashboard' || activeCrop !== 'Wheat') return

    let cancelled = false

    async function loadCrop() {
      setLoading(true)
      setError(false)

      try {
        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error('Request failed')
        }

        const result = await response.json()

        if (!result.success || !result.data) {
          throw new Error('No crop data')
        }

        if (!cancelled) setCrop(result.data)
      } catch {
        if (!cancelled) setError(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadCrop()

    return () => {
      cancelled = true
    }
  }, [page, activeCrop, refreshKey])

  function updateLocation(field, value) {
    setFarmLocation((previous) => ({
      ...previous,
      [field]: value,
    }))
  }

  function useCurrentLocation() {
    setLocationMessage('')

    if (!navigator.geolocation) {
      setLocationMessage('locationUnavailable')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude.toFixed(4)
        const longitude = position.coords.longitude.toFixed(4)
        setCoordinates(`${latitude}, ${longitude}`)
        setLocationMessage('coordinatesCaptured')
      },
      () => setLocationMessage('locationDenied'),
      { enableHighAccuracy: false, timeout: 10000 }
    )
  }

  function continueFromLocation(event) {
    event.preventDefault()

    const hasManualLocation =
      farmLocation.region.trim() && farmLocation.woreda.trim()

    if (!hasManualLocation && !coordinates) {
      setLocationMessage('locationRequired')
      return
    }

    setPage('crops')
  }

  function toggleCrop(name) {
    const isSelected = selectedCrops.includes(name)

    if (isSelected) {
      if (selectedCrops.length === 1) return

      const next = selectedCrops.filter((item) => item !== name)
      if (activeCrop === name) setActiveCrop(next[0])
      setSelectedCrops(next)
      if (activeCrop === name || activeCrop !== 'Wheat') {
        setCrop(null)
        setError(false)
        setLoading(false)
      }
      return
    }

    setSelectedCrops((previous) => [...previous, name])
    setActiveCrop(name)
    setCrop(null)
    setError(false)
    setLoading(false)
  }

  function openDashboard() {
    if (!selectedCrops.includes(activeCrop)) {
      setActiveCrop(selectedCrops[0])
    }
    setPage('dashboard')
  }

  const locationParts = [
    farmLocation.region,
    farmLocation.zone,
    farmLocation.woreda,
    farmLocation.village,
  ].filter((part) => part.trim())

  const locationSummary =
    locationParts.join(' · ') ||
    (coordinates ? t.deviceLocationRecorded : t.noLocation)

  const rawStatus = String(crop?.status || '').toLowerCase()
  const statusLabel = rawStatus.includes('critical')
    ? t.needsAttention
    : rawStatus.includes('warning')
      ? t.checkConditions
      : rawStatus.includes('healthy')
        ? t.reportedHealthy
        : t.statusUnknown

  const statusTone = rawStatus.includes('critical')
    ? 'critical'
    : rawStatus.includes('warning')
      ? 'warning'
      : rawStatus.includes('healthy')
        ? 'healthy'
        : 'unknown'

  const metrics = crop
    ? [
        { label: t.soilMoisture, value: crop.metrics?.soilMoisture, scale: 100, levels: [[30, 'metricDry'], [70, 'metricGood'], [Infinity, 'metricWet']], icon: <Droplets size={23} aria-hidden="true" /> },
        { label: t.temperature, value: crop.metrics?.temprature, scale: 60, levels: [[15, 'metricCool'], [30, 'metricGood'], [40, 'metricWarm'], [Infinity, 'metricVeryWarm']], icon: <Thermometer size={23} aria-hidden="true" /> },
        { label: t.humidity, value: crop.metrics?.humidity, scale: 100, levels: [[30, 'metricDry'], [70, 'metricGood'], [Infinity, 'metricHumid']], icon: <CloudRain size={23} aria-hidden="true" /> },
        { label: t.windSpeed, value: crop.metrics?.windSpeed, scale: 60, levels: [[10, 'metricCalm'], [30, 'metricModerate'], [Infinity, 'metricStrong']], icon: <Wind size={23} aria-hidden="true" /> },
        { label: t.rainfall, value: crop.metrics?.rainFall, scale: 20, levels: [[2, 'metricLow'], [10, 'metricModerate'], [Infinity, 'metricHigh']], icon: <CloudRain size={23} aria-hidden="true" /> },
      ]
    : []

  function getMetricInterpretation(metric) {
    if (metric.value === null || metric.value === undefined || metric.value === '') {
      return { label: t.statusUnknown, progress: 0 }
    }

    const value = Number(metric.value)
    if (!Number.isFinite(value)) {
      return { label: t.statusUnknown, progress: 0 }
    }

    const level = metric.levels.find(([threshold]) => value <= threshold)
    return {
      label: level ? t[level[1]] : t.statusUnknown,
      progress: Math.min(100, Math.max(0, (value / metric.scale) * 100)),
    }
  }

  const dateLocale = language === 'am' ? 'am-ET' : 'en-US'
  const sampleDecision =
    riskPreference === 'bold' && sampleDrySpellRisk === 'medium' ? 'PLANT' : 'WAIT'
  const decisionReason = {
    bold: t.boldDecisionReason,
    balanced: t.balancedDecisionReason,
    careful: t.carefulDecisionReason,
  }[riskPreference]
  const riskOptions = [
    { value: 'bold', label: t.riskBold, description: t.riskBoldDescription },
    { value: 'balanced', label: t.riskBalanced, description: t.riskBalancedDescription },
    { value: 'careful', label: t.riskCareful, description: t.riskCarefulDescription },
  ]

  return (
    <div className="app-shell" lang={language === 'am' ? 'am' : 'en'}>
      <header className="topbar">
        <button
          className="brand"
          onClick={() => setPage('welcome')}
          aria-label="Nebula home"
        >
          <span className="brand-mark">N</span>
          <span>
            <strong className="brand-name">NEBULA</strong>
            <span className="brand-subtitle">{t.farmCompanion}</span>
          </span>
        </button>

        <div className="topbar-right">
          {(page === 'dashboard' || page === 'guidance') && (
            <nav className="main-nav" aria-label="Main navigation">
              <button
                className={page === 'dashboard' ? 'nav-link active' : 'nav-link'}
                onClick={() => setPage('dashboard')}
              >
                <Wheat className="nav-icon" size={19} aria-hidden="true" />
                {t.myCrops}
              </button>
              <button
                className={page === 'guidance' ? 'nav-link active' : 'nav-link'}
                onClick={() => setPage('guidance')}
              >
                <Info className="nav-icon" size={19} aria-hidden="true" />
                {t.help}
              </button>
            </nav>
          )}

          <button
            className="language-button"
            onClick={toggleLanguage}
            aria-label={language === 'en' ? 'Switch to Amharic' : 'ወደ እንግሊዝኛ ቀይር'}
          >
            <Languages className="language-icon" size={19} aria-hidden="true" />
            {t.switchLanguage}
          </button>
        </div>
      </header>

      <main className="main-content">
        {page === 'welcome' && (
          <section className="welcome-page">
            <div
              className="welcome-hero"
              style={{
                backgroundImage: `linear-gradient(180deg, rgb(11 11 12 / 0%) 16%, rgb(11 11 12 / 24%) 46%, rgb(11 11 12 / 88%) 100%), url("${plantingImage}")`,
              }}
            >
              <div className="welcome-copy">
                <p className="eyebrow">{t.welcomeEyebrow}</p>
                <h1>
                  {t.welcomeTitle1}
                  <br />
                  <span>{t.welcomeTitle2}</span>
                </h1>
                <p className="lead">{t.welcomeText}</p>
                <button
                  className="primary-button large-button"
                  onClick={() => setPage('location')}
                >
                  {t.setupFarm}
                  <ArrowRight size={20} aria-hidden="true" />
                </button>
              </div>
            </div>
            <p className="hero-photo-credit">{t.photoCredit}</p>

            <section className="welcome-process" aria-labelledby="welcome-process-title">
              <div className="welcome-process-heading">
                <h2 id="welcome-process-title">{t.howItWorks}</h2>
              </div>
              <div className="welcome-benefits">
                <article>
                  <span className="process-step" aria-hidden="true">1</span>
                  <h3>{t.addLocation}</h3>
                  <p>{t.addLocationText}</p>
                </article>
                <span className="process-connector" aria-hidden="true">
                  <ArrowRight size={28} />
                </span>
                <article>
                  <span className="process-step" aria-hidden="true">2</span>
                  <h3>{t.chooseCrops}</h3>
                  <p>{t.chooseCropsText}</p>
                </article>
                <span className="process-connector" aria-hidden="true">
                  <ArrowRight size={28} />
                </span>
                <article>
                  <span className="process-step" aria-hidden="true">3</span>
                  <h3>{t.understandReadings}</h3>
                  <p>{t.understandReadingsText}</p>
                </article>
              </div>
            </section>
          </section>
        )}

        {page === 'location' && (
          <section className="setup-page">
            <div className="setup-heading">
              <p className="eyebrow">{t.locationEyebrow}</p>
              <h1>{t.locationTitle}</h1>
              <p>{t.locationText}</p>
            </div>

            <div className="step-track">
              <span className="step done">1</span>
              <span className="step-line"></span>
              <span className="step">2</span>
              <span className="step-line"></span>
              <span className="step">3</span>
            </div>

            <form className="form-card" onSubmit={continueFromLocation}>
              <div className="form-grid">
                <label className="field">
                  <span>{t.region}</span>
                  <input
                    value={farmLocation.region}
                    onChange={(event) => updateLocation('region', event.target.value)}
                    placeholder={t.regionHint}
                  />
                </label>
                <label className="field">
                  <span>{t.zone}</span>
                  <input
                    value={farmLocation.zone}
                    onChange={(event) => updateLocation('zone', event.target.value)}
                    placeholder={t.zoneHint}
                  />
                </label>
                <label className="field">
                  <span>{t.woreda}</span>
                  <input
                    value={farmLocation.woreda}
                    onChange={(event) => updateLocation('woreda', event.target.value)}
                    placeholder={t.woredaHint}
                  />
                </label>
                <label className="field">
                  <span>
                    {t.village} <em>{t.optional}</em>
                  </span>
                  <input
                    value={farmLocation.village}
                    onChange={(event) => updateLocation('village', event.target.value)}
                    placeholder={t.villageHint}
                  />
                </label>
              </div>

              <div className="location-option">
                <div className="location-option-icon"><MapPin size={24} aria-hidden="true" /></div>
                <div className="location-option-copy">
                  <strong>{t.atFarm}</strong>
                  <p>{t.atFarmText}</p>
                  {coordinates && (
                    <p className="location-success">{t.locationSavedCoordinates}</p>
                  )}
                </div>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={useCurrentLocation}
                >
                  {t.useLocation}
                </button>
              </div>

              {locationMessage && (
                <p className="notice-message" role="status">
                  {t[locationMessage]}
                </p>
              )}

              <p className="privacy-note">{t.locationPrivacy}</p>

              <div className="form-actions">
                <button
                  type="button"
                  className="text-button"
                  onClick={() => setPage('welcome')}
                >
                  {t.back}
                </button>
                <button className="primary-button" type="submit">
                  {t.continueCrops} <ArrowRight size={20} aria-hidden="true" />
                </button>
              </div>
            </form>
          </section>
        )}

        {page === 'crops' && (
          <section className="setup-page">
            <div className="setup-heading">
              <p className="eyebrow">{t.cropsEyebrow}</p>
              <h1>{t.cropsTitle}</h1>
              <p>{t.cropsText}</p>
            </div>

            <div className="step-track">
              <span className="step done"><Check size={18} aria-hidden="true" /></span>
              <span className="step-line done-line"></span>
              <span className="step done">2</span>
              <span className="step-line"></span>
              <span className="step">3</span>
            </div>

            <div className="crop-choice-grid">
              <button
                className={selectedCrops.includes('Wheat') ? 'crop-choice selected' : 'crop-choice'}
                onClick={() => toggleCrop('Wheat')}
                aria-pressed={selectedCrops.includes('Wheat')}
              >
                <span className="crop-picture wheat-picture"><Wheat size={28} aria-hidden="true" /></span>
                <span className="crop-choice-text">
                  <strong>{t.wheat}</strong>
                  <span>{t.wheatText}</span>
                </span>
                <span className="selection-indicator">
                  {selectedCrops.includes('Wheat')
                    ? <Check size={18} aria-hidden="true" />
                    : <Plus size={18} aria-hidden="true" />}
                </span>
              </button>

              <button
                className={selectedCrops.includes('Coffee') ? 'crop-choice selected' : 'crop-choice'}
                onClick={() => toggleCrop('Coffee')}
                aria-pressed={selectedCrops.includes('Coffee')}
              >
                <span className="crop-picture coffee-picture"><Coffee size={28} aria-hidden="true" /></span>
                <span className="crop-choice-text">
                  <strong>{t.coffee}</strong>
                  <span>{t.coffeeSelectionText}</span>
                </span>
                <span className="selection-indicator">
                  {selectedCrops.includes('Coffee')
                    ? <Check size={18} aria-hidden="true" />
                    : <Plus size={18} aria-hidden="true" />}
                </span>
              </button>

              <div className="crop-choice unavailable">
                <span className="crop-picture teff-picture"><Sprout size={28} aria-hidden="true" /></span>
                <span className="crop-choice-text">
                  <strong>{t.teff}</strong>
                  <span>{t.teffText}</span>
                </span>
                <span className="coming-soon">{t.comingSoon}</span>
              </div>
            </div>

            <div className="farm-summary">
              <span className="icon-tile"><MapPin size={22} aria-hidden="true" /></span>
              <div>
                <strong>{t.yourLocation}</strong>
                <p>{locationSummary}</p>
              </div>
              <button className="text-button" onClick={() => setPage('location')}>
                {t.edit}
              </button>
            </div>

            <div className="form-actions">
              <button className="text-button" onClick={() => setPage('location')}>
                {t.back}
              </button>
              <button className="primary-button" onClick={openDashboard}>
                {t.viewCrops} <ArrowRight size={20} aria-hidden="true" />
              </button>
            </div>
          </section>
        )}

        {page === 'dashboard' && (
          <section className="dashboard-page">
            <div className="dashboard-heading">
              <div>
                <p className="eyebrow">{t.dashboardEyebrow}</p>
                <h1>{t.helloFarmer} <Sprout size={28} aria-hidden="true" /></h1>
                <p className="location-line"><MapPin size={18} aria-hidden="true" /> {locationSummary}</p>
              </div>
              <button className="secondary-button" onClick={() => setPage('location')}>
                {t.editLocation}
              </button>
            </div>

            <div className="crop-tabs" aria-label={t.myCrops}>
              {selectedCrops.map((name) => (
                <button
                  key={name}
                  className={activeCrop === name ? 'crop-tab active' : 'crop-tab'}
                  onClick={() => setActiveCrop(name)}
                >
                  {name === 'Wheat'
                    ? <Wheat size={18} aria-hidden="true" />
                    : <Coffee size={18} aria-hidden="true" />}
                  {name === 'Wheat' ? t.wheat : t.coffee}
                </button>
              ))}
            </div>

            <section className="decision-controls" aria-labelledby="outlook-title">
              <div className="outlook-summary">
                <div>
                  <h2 id="outlook-title">{t.outlookHeading}</h2>
                  <p className="outlook-risk">
                    <span>{t.drySpellRisk}</span>
                    <strong>{t.riskMedium}</strong>
                  </p>
                  <p className="outlook-note">{t.outlookDemoNote}</p>
                </div>
                <span className="icon-tile" aria-hidden="true">
                  <CloudRain size={24} />
                </span>
              </div>
              <div className="risk-control">
                <h3>{t.riskSelectorHeading}</h3>
                <div className="risk-options" role="group" aria-label={t.riskSelectorHeading}>
                  {riskOptions.map((option) => (
                    <button
                      className={riskPreference === option.value ? 'risk-option selected' : 'risk-option'}
                      key={option.value}
                      type="button"
                      aria-pressed={riskPreference === option.value}
                      onClick={() => setRiskPreference(option.value)}
                    >
                      <span className="risk-option-label">{option.label}</span>
                      <span className="risk-option-description">{option.description}</span>
                    </button>
                  ))}
                </div>
                <p className="risk-selection-note">{t.riskSelectionNote}</p>
              </div>
            </section>

            {/* TODO: Replace the sample risk and decision with forecast-backed data. */}
            <PlantOrWait
              decision={sampleDecision}
              labels={{
                question: t.verdictQuestion,
                plant: t.plantNow,
                wait: t.wait,
                reason: decisionReason,
                sample: t.sampleData,
              }}
            />
            <RainChart
              values={sampleRainfall}
              labels={{
                title: t.rainHistory,
                caption: t.rainChartCaption,
                unit: t.rainUnit,
                daysAgoAxis: t.chartDaysAgo,
                reference: t.chartReference,
                highestDay: t.highestRainfallDay,
                threshold: sampleRainfallReference,
                dayAgo: t.dayAgo,
                daysAgo: t.daysAgo,
                sample: t.sampleData,
              }}
            />

            {activeCrop === 'Wheat' && (
              <>
                <div className="crop-summary-card">
                  <div>
                    <p className="section-kicker">{t.monitoring}</p>
                    <h2>{t.wheat}</h2>
                    <p>{t.readingsIntro}</p>
                  </div>
                  <div className={`status-pill ${statusTone}`}>
                    <span className="status-dot"></span>
                    {crop ? statusLabel : t.checkingStatus}
                  </div>
                </div>

                {loading && !crop && (
                  <div className="message-card">
                    <span className="icon-tile"><Sprout size={28} aria-hidden="true" /></span>
                    <h3>{t.loadingTitle}</h3>
                    <p>{t.loadingText}</p>
                  </div>
                )}

                {error && !crop && (
                  <div className="message-card">
                    <span className="icon-tile"><Info size={28} aria-hidden="true" /></span>
                    <h3>{t.loadErrorTitle}</h3>
                    <p>{t.loadErrorText}</p>
                    <button className="primary-button" onClick={() => setRefreshKey((value) => value + 1)}>
                      {t.tryAgain}
                    </button>
                  </div>
                )}

                {crop && (
                  <>
                    {rawStatus.includes('critical') && (
                      <div className="attention-banner">
                        <span className="banner-icon"><Info size={20} aria-hidden="true" /></span>
                        <div>
                          <strong>{t.criticalTitle}</strong>
                          <p>{t.criticalText}</p>
                        </div>
                      </div>
                    )}

                    <div className="section-heading">
                      <div>
                        <h2>{t.wheatReadings}</h2>
                        <p>{t.readingsText}</p>
                      </div>
                      <button
                        className="secondary-button"
                        onClick={() => setRefreshKey((value) => value + 1)}
                        disabled={loading}
                      >
                        {loading ? t.refreshing : <><RefreshCw size={18} aria-hidden="true" /> {t.refresh}</>}
                      </button>
                    </div>

                    <div className="metrics-grid">
                      {metrics.map((metric) => {
                        const interpretation = getMetricInterpretation(metric)
                        const rawValue = metric.value ?? '—'

                        return (
                          <article className="metric-card" key={metric.label}>
                            <span className="metric-icon">{metric.icon}</span>
                            <p className="metric-label">{metric.label}</p>
                            <p className="metric-value">{interpretation.label}</p>
                            <div
                              className="metric-progress"
                              role="progressbar"
                              aria-label={`${metric.label}: ${interpretation.label}`}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              aria-valuenow={interpretation.progress}
                            >
                              <span style={{ width: `${interpretation.progress}%` }} />
                            </div>
                            <p className="metric-raw">
                              {t.sampleReading}: {rawValue}
                            </p>
                          </article>
                        )
                      })}
                    </div>

                    <div className="data-footer">
                      <span><Clock3 size={18} aria-hidden="true" /></span>
                      <p>
                        {t.lastUpdated}{' '}
                        {crop.lastUpdated && !Number.isNaN(Date.parse(crop.lastUpdated))
                          ? new Date(crop.lastUpdated).toLocaleString(dateLocale)
                          : '—'}
                      </p>
                    </div>
                    <p className="small-note">{t.sampleNote}</p>
                  </>
                )}
              </>
            )}

            {activeCrop === 'Coffee' && (
              <div className="message-card coffee-message">
                <span className="icon-tile"><Coffee size={28} aria-hidden="true" /></span>
                <p className="eyebrow">{t.coffeeEyebrow}</p>
                <h2>{t.coffeeTitle}</h2>
                <p>{t.coffeeText}</p>
                <button className="secondary-button" onClick={() => setPage('guidance')}>
                  {t.seeNext}
                </button>
              </div>
            )}

          </section>
        )}

        {page === 'guidance' && (
          <section className="guidance-page">
            <div className="setup-heading">
              <p className="eyebrow">{t.guidanceEyebrow}</p>
              <h1>{t.guidanceTitle}</h1>
              <p>{t.guidanceIntro}</p>
            </div>

            {activeCrop === 'Wheat' && crop ? (
              <div className="guidance-card">
                <span className="guidance-icon"><Search size={22} aria-hidden="true" /></span>
                <div>
                  <h2>{t.checkWheat}</h2>
                  <p>{t.wheatGuidance} "{crop.status}".</p>
                  <p>{t.wheatGuidance2}</p>
                  <p>{t.wheatGuidance3}</p>
                </div>
              </div>
            ) : (
              <div className="guidance-card">
                <span className="guidance-icon"><Sprout size={22} aria-hidden="true" /></span>
                <div>
                  <h2>{t.guidanceNotReady}</h2>
                  <p>{t.guidanceNotReadyText}</p>
                </div>
              </div>
            )}

            <h2 className="guidance-section-title">{t.howNebulaHelps}</h2>

            <div className="guidance-list">
              <article>
                <span><Info size={22} aria-hidden="true" /></span>
                <div>
                  <h3>{t.understandNumbers}</h3>
                  <p>{t.understandNumbersText}</p>
                </div>
              </article>
              <article>
                <span><CloudRain size={22} aria-hidden="true" /></span>
                <div>
                  <h3>{t.localConditions}</h3>
                  <p>{t.localConditionsText}</p>
                </div>
              </article>
              <article>
                <span><Sprout size={22} aria-hidden="true" /></span>
                <div>
                  <h3>{t.askForHelp}</h3>
                  <p>{t.askForHelpText}</p>
                </div>
              </article>
            </div>

            <button className="primary-button" onClick={() => setPage('dashboard')}>
              {t.backToCrops}
            </button>
          </section>
        )}
      </main>

      <footer className="app-footer">
        <span className="footer-brand">NEBULA</span>
        <span className="prototype-label">{t.prototype}</span>
      </footer>
    </div>
  )
}

export default App