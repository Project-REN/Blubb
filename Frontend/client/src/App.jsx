import { useEffect, useState } from 'react'
import './App.css'

const API_URL = 'http://localhost:5002/api/mock/crops/1/health'

const translations = {
  en: {
    farmCompanion: 'Your farm companion',
    myCrops: 'My crops',
    help: 'Help & guidance',
    switchLanguage: 'አማርኛ',

    welcomeEyebrow: 'A FRIENDLIER WAY TO CARE FOR YOUR FARM',
    welcomeTitle1: 'Your crops matter.',
    welcomeTitle2: "We're here to help.",
    welcomeText:
      'Understand your farm conditions, keep an eye on your crops, and find helpful information—all in one simple place.',
    setupFarm: "Let's set up your farm",
    welcomeNote: 'Simple steps. Clear information. Made with farmers in mind.',
    chooseCrops: 'Choose your crops',
    chooseCropsText: 'Start with the crops growing on your farm.',
    addLocation: 'Add your location',
    addLocationText: 'Help us work toward information relevant to your area.',
    understandReadings: 'Understand your readings',
    understandReadingsText: 'See your available crop information in one place.',
    growingTogether: 'Growing better, together.',

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
    coffeeText: 'Monitor coffee conditions',
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
    needHelp: 'Need a hand?',
    needHelpText:
      'Visit Help & guidance for more information about this prototype.',
    learnMore: 'Learn more',
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
  },

  am: {
    farmCompanion: 'የእርሻዎ አጋር',
    myCrops: 'ሰብሎቼ',
    help: 'እገዛ እና መመሪያ',
    switchLanguage: 'English',

    welcomeEyebrow: 'እርሻዎን ለመንከባከብ ቀላል መንገድ',
    welcomeTitle1: 'ሰብሎችዎ ወሳኝ ናቸው።',
    welcomeTitle2: 'እኛ ለመርዳት እዚህ ነን።',
    welcomeText:
      'የእርሻዎን ሁኔታ ይረዱ፣ ሰብሎችዎን ይከታተሉ፣ ጠቃሚ መረጃም በአንድ ቦታ ያግኙ።',
    setupFarm: 'እርሻዎን እናዘጋጅ',
    welcomeNote: 'ቀላል እርምጃዎች። ግልጽ መረጃ። ለገበሬዎች የተዘጋጀ።',
    chooseCrops: 'ሰብሎችዎን ይምረጡ',
    chooseCropsText: 'በእርሻዎ ላይ ካሉ ሰብሎች ይጀምሩ።',
    addLocation: 'የእርሻዎን ቦታ ያስገቡ',
    addLocationText: 'ለአካባቢዎ የሚስማማ መረጃ እንድናዘጋጅ ይረዳናል።',
    understandReadings: 'የመለኪያ ውጤቶችን ይረዱ',
    understandReadingsText: 'ስለ ሰብሎችዎ ያለውን መረጃ በአንድ ቦታ ይመልከቱ።',
    growingTogether: 'አብረን የተሻለ እናድግ።',

    locationEyebrow: 'ስለ እርሻዎ እንወቅ',
    locationTitle: 'እርሻዎ የት ይገኛል?',
    locationText:
      'ይህ ለአካባቢዎ የሚስማማ የሰብል እና የአየር ሁኔታ መረጃ ለማዘጋጀት ይረዳል። ይህን መረጃ በኋላ መቀየር ይችላሉ።',
    region: 'ክልል',
    zone: 'ዞን',
    woreda: 'ወረዳ',
    village: 'ቀበሌ ወይም መንደር',
    optional: '(አስፈላጊ አይደለም)',
    regionHint: 'ለምሳሌ፦ ኦሮሚያ',
    zoneHint: 'የዞን ስም ያስገቡ',
    woredaHint: 'የወረዳ ስም ያስገቡ',
    villageHint: 'የቀበሌ ወይም የመንደር ስም ያስገቡ',
    atFarm: 'አሁን እርሻ ላይ ነዎት?',
    atFarmText:
      'ከፈለጉ የስልክዎን የአካባቢ መረጃ መጠቀም ይችላሉ። እርሻው ላይ ከሆኑ ብቻ ይጠቀሙት።',
    useLocation: 'የአሁኑን ቦታ ይጠቀሙ',
    coordinatesCaptured:
      'የአካባቢ መጋጠሚያዎች ለዚህ ጊዜያዊ ክፍለ ጊዜ ተመዝግበዋል። ገና ወደ ባክኤንድ አልተላኩም።',
    locationUnavailable:
      'በዚህ አሳሽ የአካባቢ መለየት አይገኝም። የእርሻዎን ቦታ በእጅ ማስገባት ይችላሉ።',
    locationDenied:
      'የአካባቢ መረጃዎን ማግኘት አልቻልንም። የእርሻዎን ቦታ በእጅ ማስገባት ይችላሉ።',
    locationRequired:
      'እባክዎ ቢያንስ ክልል እና ወረዳ ያስገቡ ወይም የስልክዎን አካባቢ ይጠቀሙ።',
    locationPrivacy:
      'በዚህ የሙከራ ስሪት የአካባቢ መረጃው በአሁኑ ገጽ ውስጥ ብቻ ይቆያል። ወደ ባክኤንድ አይላክም እና በመለያ ውስጥ አይቀመጥም።',
    continueCrops: 'ወደ ሰብሎች ይቀጥሉ',
    back: 'ተመለስ',
    stepLocation: 'የእርሻ ቦታ',
    stepCrops: 'ሰብሎችን ይምረጡ',

    cropsEyebrow: 'ደረጃ 2 · እርሻዎ',
    cropsTitle: 'ምን ሰብሎች ያመርታሉ?',
    cropsText: 'የሚያመርቷቸውን ሰብሎች ሁሉ ይምረጡ። ከአንድ በላይ መምረጥ ይችላሉ።',
    wheat: 'ስንዴ',
    wheatText: 'የስንዴ ሁኔታን ይከታተሉ',
    coffee: 'ቡና',
    coffeeText: 'የቡና ሁኔታን ይከታተሉ',
    teff: 'ጤፍ',
    teffText: 'ይህን በሚቀጥለው ስሪት ለማካተት እየተዘጋጀን ነው።',
    comingSoon: 'በኋላ ይጨመራል',
    yourLocation: 'የእርሻዎ ቦታ',
    edit: 'ይቀይሩ',
    viewCrops: 'ሰብሎቼን ይመልከቱ',

    dashboardEyebrow: 'የእርሻዎ አጠቃላይ ሁኔታ',
    helloFarmer: 'ሰላም ገበሬ!',
    editLocation: 'ቦታን ይቀይሩ',
    monitoring: 'አሁን የሚከታተሉት',
    readingsIntro: 'ለዚህ ሰብል አሁን የሚገኘው መረጃ ይህ ነው።',
    checkingStatus: 'ሁኔታውን በማረጋገጥ ላይ',
    needsAttention: 'ትኩረት ያስፈልጋል',
    checkConditions: 'ሁኔታውን ይፈትሹ',
    reportedHealthy: 'ጥሩ ሁኔታ መሆኑ ተገልጿል',
    statusUnknown: 'ሁኔታው አልተረጋገጠም',
    wheatReadings: 'የሰብል መለኪያዎች',
    readingsText: 'በአሁኑ ባክኤንድ የተላኩ ውጤቶች።',
    refresh: 'አድስ',
    refreshing: 'በማደስ ላይ...',
    soilMoisture: 'የአፈር እርጥበት',
    temperature: 'የሙቀት መጠን',
    humidity: 'የአየር እርጥበት',
    windSpeed: 'የነፋስ ፍጥነት',
    rainfall: 'የዝናብ መጠን',
    lastUpdated: 'መጨረሻ የተዘመነው፦',
    sampleNote:
      'እነዚህ የሙከራ የኤፒአይ ውጤቶች ናቸው። የመለኪያ አሃዶችና ለእያንዳንዱ ሰብል የሚስማሙ ገደቦች ገና መረጋገጥ አለባቸው።',
    criticalTitle: 'ይህ ውጤት በተጨማሪ መፈተሽ አለበት',
    criticalText:
      'የሙከራው ኤፒአይ ወሳኝ ሁኔታ መኖሩን ያሳያል። ይህ የሙከራ መረጃ ስለሆነና የመለኪያ አሃዶችና ገደቦች ስላልተረጋገጡ፣ የእርሻ ውሳኔ ከመወሰንዎ በፊት መረጃውን ያረጋግጡ።',
    loadingTitle: 'የሰብል መረጃዎን በማግኘት ላይ',
    loadingText: 'ኔቡላ የሚገኘውን የቅርብ ጊዜ መረጃ እስኪጠይቅ ይጠብቁ።',
    loadErrorTitle: 'የመለኪያ ውጤቶቹን ማግኘት አልቻልንም',
    loadErrorText: 'ባክኤንዱ እየሠራ መሆኑን ያረጋግጡና እንደገና ይሞክሩ።',
    tryAgain: 'እንደገና ይሞክሩ',
    needHelp: 'እገዛ ይፈልጋሉ?',
    needHelpText: 'ስለዚህ የሙከራ ስሪት ተጨማሪ መረጃ በእገዛ እና መመሪያ ውስጥ ያግኙ።',
    learnMore: 'ተጨማሪ ይወቁ',
    coffeeEyebrow: 'የቡና ክትትል',
    coffeeTitle: 'የቡና መረጃዎን እናገናኝ',
    coffeeText:
      'በዚህ የሙከራ ስሪት ቡናን መምረጥ ይቻላል፣ ነገር ግን ባክኤንዱ በአሁኑ ጊዜ የስንዴ የሙከራ መረጃ ብቻ ይሰጣል። የቡና መለኪያዎችን አልፈጠርንም ወይም አላሳየንም።',
    seeNext: 'ቀጣዩን ይመልከቱ',
    prototype: 'የመጀመሪያ የሙከራ ስሪት',

    guidanceEyebrow: 'ለመርዳት እዚህ ነን',
    guidanceTitle: 'እገዛ እና መመሪያ',
    guidanceIntro: 'ግልጽ መረጃ ስለ እርሻዎ የተሻለ ውሳኔ ለመወሰን ይረዳል።',
    checkWheat: 'የስንዴ መለኪያዎችን ይፈትሹ',
    wheatGuidance: 'የአሁኑ የሙከራ ኤፒአይ የሚያሳየው ሁኔታ፦',
    wheatGuidance2:
      'እነዚህ የሙከራ ውጤቶች ናቸው። አሃዶቻቸውና ሁኔታውን ለመወሰን የተጠቀሙት ደንቦች ገና አልተረጋገጡም።',
    wheatGuidance3:
      'እርምጃ ከመውሰድዎ በፊት መለኪያዎቹን ያረጋግጡ። ስለ ሰብልዎ ካሳሰበዎት የአካባቢውን የግብርና ባለሙያ ያማክሩ።',
    guidanceNotReady: 'ለዚህ ሰብል የተለየ መመሪያ ገና እየተዘጋጀ ነው',
    guidanceNotReadyText:
      'ይህ የሙከራ ስሪት ለዚህ ሰብል የተረጋገጡ መለኪያዎችና ምክሮች ገና የሉትም። ተገቢው መረጃ ሲገኝ እንጨምራቸዋለን።',
    howNebulaHelps: 'ኔቡላ እንዴት ይረዳል?',
    understandNumbers: 'ቁጥሮቹን ይረዱ',
    understandNumbersText:
      'የመለኪያዎቹ አሃድና ትርጉም ሲረጋገጥ በቀላል ቋንቋ እናብራራቸዋለን።',
    localConditions: 'የአካባቢዎን ሁኔታ ይወቁ',
    localConditionsText:
      'ተገቢ የመረጃ ምንጭ ሲገናኝ ከቦታዎ ጋር የተያያዘ የአየር ሁኔታ መረጃ ማከል ይቻላል።',
    askForHelp: 'እገዛ መቼ እንደሚጠይቁ ይወቁ',
    askForHelpText:
      'መለኪያዎች ግልጽ ካልሆኑ ወይም አሳሳቢ ከሆኑ፣ የሚታመን የአካባቢ የግብርና ባለሙያ ያማክሩ።',
    backToCrops: 'ወደ ሰብሎቼ ተመለስ',
    noLocation: 'የእርሻ ቦታ አልተጨመረም',
    deviceLocationRecorded: 'የስልክ አካባቢ ተመዝግቧል',
    locationSavedCoordinates: 'መጋጠሚያዎች ለዚህ ጊዜያዊ ክፍለ ጊዜ ተመዝግበዋል።',
    unitsNotice: 'የመለኪያ አሃዶች ገና አልተረጋገጡም።',
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
    if (page !== 'dashboard') return

    if (activeCrop !== 'Wheat') {
      setCrop(null)
      setError(false)
      setLoading(false)
      return
    }

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
    setSelectedCrops((previous) => {
      if (previous.includes(name)) {
        if (previous.length === 1) return previous

        const next = previous.filter((item) => item !== name)
        if (activeCrop === name) setActiveCrop(next[0])
        return next
      }

      setActiveCrop(name)
      return [...previous, name]
    })
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
        { label: t.soilMoisture, value: crop.metrics?.soilMoisture, icon: '💧' },
        { label: t.temperature, value: crop.metrics?.temprature, icon: '🌡️' },
        { label: t.humidity, value: crop.metrics?.humidity, icon: '☁️' },
        { label: t.windSpeed, value: crop.metrics?.windSpeed, icon: '💨' },
        { label: t.rainfall, value: crop.metrics?.rainFall, icon: '🌧️' },
      ]
    : []

  const dateLocale = language === 'am' ? 'am-ET' : 'en-US'

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
                {t.myCrops}
              </button>
              <button
                className={page === 'guidance' ? 'nav-link active' : 'nav-link'}
                onClick={() => setPage('guidance')}
              >
                {t.help}
              </button>
            </nav>
          )}

          <button
            className="language-button"
            onClick={toggleLanguage}
            aria-label={language === 'en' ? 'Switch to Amharic' : 'ወደ እንግሊዝኛ ቀይር'}
          >
            <span aria-hidden="true">🌐</span>
            {t.switchLanguage}
          </button>
        </div>
      </header>

      <main className="main-content">
        {page === 'welcome' && (
          <section className="welcome-page">
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
                {t.setupFarm} <span aria-hidden="true">→</span>
              </button>
              <p className="small-note">{t.welcomeNote}</p>
            </div>

            <div className="welcome-art" aria-hidden="true">
              <div className="sun"></div>
              <div className="hill hill-back"></div>
              <div className="hill hill-front"></div>
              <div className="field-lines"></div>
              <div className="plant plant-one">✳</div>
              <div className="plant plant-two">✳</div>
              <div className="welcome-art-label">
                <span>🌱</span>
                <span>{t.growingTogether}</span>
              </div>
            </div>

            <div className="welcome-benefits">
              <article>
                <span className="benefit-icon">🌾</span>
                <h3>{t.chooseCrops}</h3>
                <p>{t.chooseCropsText}</p>
              </article>
              <article>
                <span className="benefit-icon">📍</span>
                <h3>{t.addLocation}</h3>
                <p>{t.addLocationText}</p>
              </article>
              <article>
                <span className="benefit-icon">💚</span>
                <h3>{t.understandReadings}</h3>
                <p>{t.understandReadingsText}</p>
              </article>
            </div>
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
                <div className="location-option-icon">📍</div>
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
                  {t.continueCrops} <span aria-hidden="true">→</span>
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
              <span className="step done">✓</span>
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
                <span className="crop-picture wheat-picture">🌾</span>
                <span className="crop-choice-text">
                  <strong>{t.wheat}</strong>
                  <span>{t.wheatText}</span>
                </span>
                <span className="selection-indicator">
                  {selectedCrops.includes('Wheat') ? '✓' : '+'}
                </span>
              </button>

              <button
                className={selectedCrops.includes('Coffee') ? 'crop-choice selected' : 'crop-choice'}
                onClick={() => toggleCrop('Coffee')}
                aria-pressed={selectedCrops.includes('Coffee')}
              >
                <span className="crop-picture coffee-picture">☕</span>
                <span className="crop-choice-text">
                  <strong>{t.coffee}</strong>
                  <span>{t.coffeeText}</span>
                </span>
                <span className="selection-indicator">
                  {selectedCrops.includes('Coffee') ? '✓' : '+'}
                </span>
              </button>

              <div className="crop-choice unavailable">
                <span className="crop-picture teff-picture">🌱</span>
                <span className="crop-choice-text">
                  <strong>{t.teff}</strong>
                  <span>{t.teffText}</span>
                </span>
                <span className="coming-soon">{t.comingSoon}</span>
              </div>
            </div>

            <div className="farm-summary">
              <span>📍</span>
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
                {t.viewCrops} <span aria-hidden="true">→</span>
              </button>
            </div>
          </section>
        )}

        {page === 'dashboard' && (
          <section className="dashboard-page">
            <div className="dashboard-heading">
              <div>
                <p className="eyebrow">{t.dashboardEyebrow}</p>
                <h1>{t.helloFarmer} <span aria-hidden="true">🌱</span></h1>
                <p className="location-line">📍 {locationSummary}</p>
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
                  {name === 'Wheat' ? '🌾' : '☕'} {name === 'Wheat' ? t.wheat : t.coffee}
                </button>
              ))}
            </div>

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
                    <span className="large-emoji">🌱</span>
                    <h3>{t.loadingTitle}</h3>
                    <p>{t.loadingText}</p>
                  </div>
                )}

                {error && !crop && (
                  <div className="message-card">
                    <span className="large-emoji">💚</span>
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
                        <span className="banner-icon">!</span>
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
                        {loading ? t.refreshing : `↻ ${t.refresh}`}
                      </button>
                    </div>

                    <div className="metrics-grid">
                      {metrics.map((metric) => (
                        <article className="metric-card" key={metric.label}>
                          <span className="metric-icon">{metric.icon}</span>
                          <p className="metric-label">{metric.label}</p>
                          <p className="metric-value">{metric.value ?? '—'}</p>
                        </article>
                      ))}
                    </div>

                    <div className="data-footer">
                      <span>🕒</span>
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
                <span className="large-emoji">☕</span>
                <p className="eyebrow">{t.coffeeEyebrow}</p>
                <h2>{t.coffeeTitle}</h2>
                <p>{t.coffeeText}</p>
                <button className="secondary-button" onClick={() => setPage('guidance')}>
                  {t.seeNext}
                </button>
              </div>
            )}

            <div className="help-strip">
              <span className="help-icon">💡</span>
              <div>
                <strong>{t.needHelp}</strong>
                <p>{t.needHelpText}</p>
              </div>
              <button className="text-button" onClick={() => setPage('guidance')}>
                {t.learnMore} →
              </button>
            </div>
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
                <span className="guidance-icon">🔎</span>
                <div>
                  <h2>{t.checkWheat}</h2>
                  <p>{t.wheatGuidance} "{crop.status}".</p>
                  <p>{t.wheatGuidance2}</p>
                  <p>{t.wheatGuidance3}</p>
                </div>
              </div>
            ) : (
              <div className="guidance-card">
                <span className="guidance-icon">🌱</span>
                <div>
                  <h2>{t.guidanceNotReady}</h2>
                  <p>{t.guidanceNotReadyText}</p>
                </div>
              </div>
            )}

            <h2 className="guidance-section-title">{t.howNebulaHelps}</h2>

            <div className="guidance-list">
              <article>
                <span>📊</span>
                <div>
                  <h3>{t.understandNumbers}</h3>
                  <p>{t.understandNumbersText}</p>
                </div>
              </article>
              <article>
                <span>🌦️</span>
                <div>
                  <h3>{t.localConditions}</h3>
                  <p>{t.localConditionsText}</p>
                </div>
              </article>
              <article>
                <span>🤝</span>
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
        <span>{t.growingTogether}</span>
        <span className="prototype-label">{t.prototype}</span>
      </footer>
    </div>
  )
}

export default App