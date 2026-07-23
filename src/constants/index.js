export const myProjects = [
    // Drop Off Dragon
    {
        id: 1,
        title: "Drop Off Dragon",
        description: "2D Mobile Action Platformer, Shipped Title with MassDiGI",
        subDescription: [],
        href: "",
        github: "",
        liveDemo: "",
        image: `${import.meta.env.BASE_URL}assets/BannerIcon.png`,
        hoverImage: [
        `${import.meta.env.BASE_URL}assets/DropOffDragonScreenshot1.png`,
        `${import.meta.env.BASE_URL}assets/GoldScreenshot.png`,
        `${import.meta.env.BASE_URL}assets/SpikeScreenshot.png`,
        ],
        youtubeUrl: "",
        mp4: `${import.meta.env.BASE_URL}assets/trailerdropoffdragon.mp4`,
        overview: "Storm the castle, crash through obstacles, and break into vaults. Join Baby Dragon in our 2D Action platformer as you make your way down stealing piles of shiny gold!",
        details: {
        role: "Build Master, Programmer",
        type: "2D Action Platformer",
        platform: "IOS, Google Play",
        language: "C#",
        software: ["Unity", "PlasticSCM", "FMOD", "Fastlane", "Testflight"],
        duration: "3 months",
        },
        codeSnippets: [
        { title: "FMOD Manager", language: "C#", code: `using UnityEngine;
using FMODUnity;
using UnityEngine.SceneManagement;
using System.Collections.Generic;
using System.Collections;

// @author Jake DeRoma
public class FMODManager : MonoBehaviour
{   
    #region Variables
    
    // Singleton
    public static FMODManager Instance; // singleton
    public enum MusicType {Inside, Outside, Menu}
    
    // Dictionary which stores loading music on SceneLoaded by Scene name
    private readonly Dictionary<string, MusicType> musicScenes = new Dictionary<string, MusicType>()
        {
            {"Level1", MusicType.Outside}, {"Level2", MusicType.Outside}, {"Level3", MusicType.Inside},
            {"Level4", MusicType.Inside}, {"Level5", MusicType.Outside}, {"Level6", MusicType.Inside},
            {"Level7", MusicType.Outside}, {"Level8", MusicType.Outside}, {"Level9", MusicType.Inside},
            {"Level10", MusicType.Inside}, {"TitleScreen", MusicType.Menu}, {"LevelSelect", MusicType.Menu}
        };
    [HideInInspector] public MusicType CurrentlyPlayingMusic = MusicType.Outside;
    private float m_blipCooldown = .2f;
    private float m_lastBlipTime;
    private EventReference m_lastPlayedOneshot;

    [Header("Oneshots")]
    [Header("Game")]
    public EventReference m_jumpSoundEvent;
    public EventReference m_landSoundEvent;
    public EventReference m_groundPoundLandSoundEvent;
    public EventReference m_pogoSoundEvent;
    public EventReference m_breakableTileEvent;  
    public EventReference m_skeletonCollectEvent;
    public EventReference m_springEvent;
    public EventReference m_bannerUnfurlEvent;
    public EventReference m_gargoyleRespawnEvent;
    public EventReference m_slamGateLandEvent;
    public EventReference m_slamGateUpEvent;
    public EventReference m_playerDieEvent;

    [Header("UI")] 
    public EventReference m_uiButtonEvent;
    public EventReference m_uiSpecialButtonLevelSelectEvent;
    public EventReference m_uiSpecialButtonTitleEvent;
    public EventReference m_levelCompleteEvent;
    public EventReference m_skeletonUIEvent; 
    public EventReference m_bannerUIEvent;

    [Header("Loops")]
    public EventReference m_groundPoundFireSoundEvent;
    public FMOD.Studio.EventInstance m_groundPoundFireSoundEventInstance;
    public EventReference m_slamGateChainEvent;
    public FMOD.Studio.EventInstance m_slamGateChainEventInstance;
    private bool m_isGroundPoundFireSoundPlaying = false;
    private bool m_isSlamGateChainPlaying = false;

    [Header("Music")]
    public EventReference m_gameMusicEvent;
    public FMOD.Studio.EventInstance m_gameMusicEventInstance;
    public EventReference m_menuMusicEvent;
    public FMOD.Studio.EventInstance m_menuMusicEventInstance;
    [SerializeField] private float m_musicLerpSpeed = 0.01f; // crossfade speed
    private float m_currentMusicParameter = 0; // 0 = Outside, 1 = Inside
    private int m_pitch = 0; // pogo pitch
    private float m_pitchTimer = 0f;

    [BankRef]
    public string m_masterBank; // Master Bank Reference
    #endregion

    #region Unity Methods
    
    /// <summary>
    /// Awake
    /// </summary>
    void Awake() {
        // Setting up singleton design
        if(Instance) {
            Debug.LogWarning($"More than 1 FMODManager in the scene, deleting {transform.name}");
            Destroy(gameObject);
            return;
        }
        Instance = this;
    }

    /// <summary>
    /// OnEnable
    /// </summary>
    void OnEnable()
    {
        SceneManager.sceneLoaded += OnSceneLoaded;
    }

    /// <summary>
    /// Start
    /// </summary>
    void Start()
    {
        m_gameMusicEventInstance = RuntimeManager.CreateInstance(m_gameMusicEvent);
        m_menuMusicEventInstance = RuntimeManager.CreateInstance(m_menuMusicEvent);

        // Play active scene loading music
        UpdateMusicState(SceneManager.GetActiveScene());
    }

    /// <summary>
    /// Update
    /// </summary>
    void Update()
    {  
        // Handles Pogo pitch with timer
        HandlePitch();

        // Null check
        if (Camera.main == null)
        {
            return;
        }

        // Indoor/Outdoor parameter
        m_gameMusicEventInstance.setParameterByName("Gameplay_Location", m_currentMusicParameter, true);
        
        // Set 3D values to play at Camera where Listener is located
        m_menuMusicEventInstance.set3DAttributes(RuntimeUtils.To3DAttributes(Camera.main.transform));
        m_gameMusicEventInstance.set3DAttributes(RuntimeUtils.To3DAttributes(Camera.main.transform));

        // Handle if Loops are playing
        if (m_isGroundPoundFireSoundPlaying)
        {
            m_groundPoundFireSoundEventInstance.set3DAttributes(RuntimeUtils.To3DAttributes(Camera.main.transform));
        }

        if (m_isSlamGateChainPlaying)
        {
            m_slamGateChainEventInstance.set3DAttributes(RuntimeUtils.To3DAttributes(Camera.main.transform));
        }
    }

    /// <summary>
    /// OnDestroy
    /// Releases all sound for optimization
    /// </summary>
    private void OnDestroy()
    {
        if (m_gameMusicEventInstance.isValid())
        {
            m_gameMusicEventInstance.stop(FMOD.Studio.STOP_MODE.IMMEDIATE);
            m_gameMusicEventInstance.release();
        }

        if (m_menuMusicEventInstance.isValid())
        {
            m_menuMusicEventInstance.stop(FMOD.Studio.STOP_MODE.IMMEDIATE);
            m_menuMusicEventInstance.release();
        }

        if (m_groundPoundFireSoundEventInstance.isValid())
        {
            m_groundPoundFireSoundEventInstance.stop(FMOD.Studio.STOP_MODE.IMMEDIATE);
            m_groundPoundFireSoundEventInstance.release();
        }

        if (m_slamGateChainEventInstance.isValid())
        {
            m_slamGateChainEventInstance.stop(FMOD.Studio.STOP_MODE.IMMEDIATE);
            m_slamGateChainEventInstance.release();
        }

        if (Instance == this)
            Instance = null;
    }

    /// <summary>
    /// OnSceneLoaded gets player position 
    /// </summary>
    private void OnSceneLoaded(Scene scene, LoadSceneMode mode)
    {
        UpdateMusicState(scene); // Crossfade music on load
    }

    /// <summary>
    /// Resumes all sound on application unpause
    /// </summary>
    /// <param name="hasPause"></param>
    private void OnApplicationPause(bool hasPause)
    {
        if (!hasPause)
        {
            RuntimeManager.LoadBank(m_masterBank);

            // RuntimeManager.CoreSystem.setDSPBufferSize(2048, 4);
            
            RuntimeManager.CoreSystem.mixerResume();
        
            UpdateMusicState(SceneManager.GetActiveScene());
        }
        else
        {
            RuntimeManager.CoreSystem.mixerSuspend();
        }
    }
    #endregion

    #region Music/SFX Methods

    /// <summary>
    /// Updates the music state based on the current scene. 
    /// If the scene is in the gameplayScenes list, it starts playing the music event instance
    /// If not, it stops the music event instance
    /// 
    /// Is called when a new scene is loaded, and checks if the scene is in the gameplayScenes list.
    /// If it is, it starts playing the music event instance and sets the music parameter based
    /// </summary>
    /// <param name="scene"></param>
    private void UpdateMusicState(Scene scene)
    {
        // Stop invalid scenes by fading out
        if (!musicScenes.TryGetValue(scene.name, out MusicType musicType))
        {
            if (m_gameMusicEventInstance.isValid())
                m_gameMusicEventInstance.stop(FMOD.Studio.STOP_MODE.ALLOWFADEOUT);

            if (m_menuMusicEventInstance.isValid())
                m_menuMusicEventInstance.stop(FMOD.Studio.STOP_MODE.ALLOWFADEOUT);

            return;
        }

        // If music has valid scene name with loading music
        switch (musicType)
        {   
            // If in a menu scene,
            case MusicType.Menu:
                // Stop game music
                if (m_gameMusicEventInstance.isValid())
                    m_gameMusicEventInstance.stop(FMOD.Studio.STOP_MODE.ALLOWFADEOUT);

                // Starts menu music
                if (m_menuMusicEventInstance.isValid())
                {
                    FMOD.Studio.PLAYBACK_STATE state;
                    m_menuMusicEventInstance.getPlaybackState(out state);

                    if (state != FMOD.Studio.PLAYBACK_STATE.PLAYING)
                        m_menuMusicEventInstance.start();
                }

                // Update music state
                CurrentlyPlayingMusic = MusicType.Menu;
                break;

            // If inside or outside,
            case MusicType.Inside:
            case MusicType.Outside:

                // Stop menu music
                if (m_menuMusicEventInstance.isValid())
                    m_menuMusicEventInstance.stop(FMOD.Studio.STOP_MODE.ALLOWFADEOUT);

                // Start Inside or Outdoor music (parameter is handled in Update)
                if (m_gameMusicEventInstance.isValid() && Camera.main != null)
                {
                    FMOD.Studio.PLAYBACK_STATE state;
                    m_gameMusicEventInstance.getPlaybackState(out state);

                    if (state != FMOD.Studio.PLAYBACK_STATE.PLAYING)
                        m_gameMusicEventInstance.start();

                    m_gameMusicEventInstance.set3DAttributes(RuntimeUtils.To3DAttributes(Camera.main.transform));
                }

                ChangeMusic(musicType);
                break;
        }
    }

    /// <summary>
    /// Dynamically changes the music to the specified music type seamlessly with FMOD parameters.
    /// </summary>
    /// <param name="musicType"></param>
    public void ChangeMusic(MusicType musicType)
    {
        switch (musicType)
        {
            case MusicType.Inside:
                StartCoroutine(LerpMusicParameter(1));
                CurrentlyPlayingMusic = MusicType.Inside;
                break;

            case MusicType.Outside:
                StartCoroutine(LerpMusicParameter(0));
                CurrentlyPlayingMusic = MusicType.Outside;
                break;
            case MusicType.Menu:
                CurrentlyPlayingMusic = MusicType.Menu;
                break;
        }
    }

    /// <summary>
    /// Plays OneShot sound from RuntimeManager at player position
    /// </summary>
    public void PlayOneShotSound(EventReference oneShot)
    {
        // If different sound or timeCooldown 
        if ((!oneShot.Equals(m_lastPlayedOneshot) || Time.time - m_lastBlipTime >= m_blipCooldown) && Camera.main != null)
        {
            // Pogo pitch
            if (oneShot.Equals(m_pogoSoundEvent))
            {
                RuntimeManager.StudioSystem.setParameterByName("Parameter_Pogo_Pitch", m_pitch);
                
                // Adjust pitch
                m_pitch++;
                m_pitchTimer = 0f;
            }

            // Play sound
            m_lastPlayedOneshot = oneShot;
            RuntimeManager.PlayOneShot(oneShot, Camera.main.transform.position);
            m_lastBlipTime = Time.time;
        }
    }

    /// <summary>
    /// Lerps the music paramater from 0 to 1 or 1 to 0
    /// </summary>
    /// <param name="targetState"></param>
    /// <returns></returns>
    private IEnumerator LerpMusicParameter(float targetState)
    {
        while (m_currentMusicParameter != targetState)
        {
            m_currentMusicParameter = Mathf.MoveTowards(m_currentMusicParameter, targetState, m_musicLerpSpeed);
            m_gameMusicEventInstance.setParameterByName("Gameplay_Location", m_currentMusicParameter, true);
            yield return new WaitForFixedUpdate();
        }
        yield return null;
    }

    #region Loops

    /// <summary>
    /// Starts the fireball loop if it isn't already playing.
    /// </summary>
    public void StartFireballLoop()
    {
        if (!m_groundPoundFireSoundEventInstance.isValid())
        {
            m_groundPoundFireSoundEventInstance = RuntimeManager.CreateInstance(m_groundPoundFireSoundEvent);
        }

        FMOD.Studio.PLAYBACK_STATE state;
        m_groundPoundFireSoundEventInstance.getPlaybackState(out state);

        if (state != FMOD.Studio.PLAYBACK_STATE.PLAYING)
        {
            m_isGroundPoundFireSoundPlaying = true;
            m_groundPoundFireSoundEventInstance.start();
        }
    }

    /// <summary>
    /// Stops the fireball loop.
    /// </summary>
    public void StopFireballLoop()
    {
        if (!m_groundPoundFireSoundEventInstance.isValid())
            return;
        
        m_isGroundPoundFireSoundPlaying = false;
        m_groundPoundFireSoundEventInstance.stop(FMOD.Studio.STOP_MODE.ALLOWFADEOUT);
    }

    /// <summary>
    /// Starts the chain loop if it isn't already playing.
    /// </summary>
    public void StartChainLoop()
    {
        if (!m_slamGateChainEventInstance.isValid())
        {
            m_slamGateChainEventInstance = RuntimeManager.CreateInstance(m_slamGateChainEvent);
        }

        FMOD.Studio.PLAYBACK_STATE state;
        m_slamGateChainEventInstance.getPlaybackState(out state);

        if (state != FMOD.Studio.PLAYBACK_STATE.PLAYING)
        {
            m_isSlamGateChainPlaying = true;
            m_slamGateChainEventInstance.start();
        }
    }

    /// <summary>
    /// Stops the chain loop.
    /// </summary>
    public void StopChainLoop()
    {
        if (!m_slamGateChainEventInstance.isValid())
            return;
        
        m_isSlamGateChainPlaying = false;
        m_slamGateChainEventInstance.stop(FMOD.Studio.STOP_MODE.ALLOWFADEOUT);
    }
    #endregion

    /// <summary>
    /// Handles the pogo pitch incrementing on consecutive pogo in 1 second (constant value)
    /// Called in Update
    /// </summary>
    private void HandlePitch()
    {
        m_pitchTimer += Time.deltaTime;

        if (m_pitchTimer > 1f)
        {
            m_pitch = 0;
        }
    }
    
    /// <summary>
    /// 0 - Unpaused
    /// 1 - Paused
    /// Adds low pass filter to any music related sound
    /// Mostly used on pause
    /// </summary>
    /// <param name="value"></param>
    public void ApplyLowPassFilter(float value)
    {
        RuntimeManager.StudioSystem.setParameterByName("Parameter_PauseMenu", value);
    }

    #endregion
}` },
        {title: "Save Manager", language: "C#", code: `using System.Collections.Generic;
        using FMODUnity;
        using Lofelt.NiceVibrations; // Haptics
        using UnityEngine;
        using UnityEngine.Events;

        // @author: Jake DeRoma
        // Collectable addendum: James Prendergast
        public class SaveManager : MonoBehaviour
        {
            public enum TimerState {Paused, Off, On}

            #region Variables
            [Header("Singleton")]
            [Space(10)]
            public static SaveManager Instance; // singleton
            public const int k_levelScenes = 16; // buffer for levels amount including cutscenes (can be adjusted for more space)
            
            [Header("Events")]
            [Space(10)]
            [Tooltip("Triggered when save data is loaded")]
            public UnityEvent SaveLoaded;
            [Tooltip("Triggered when save data is saved")]
            public UnityEvent DataSaved;
            [Tooltip("Triggered when save data is deleted")]
            public UnityEvent SaveDeleted;

            #endregion

            [Header("Save Data")]
            [Space(10)]
            [HideInInspector] public List<int> LevelsCollectables; // L0 XXXX, L1 XXXX, L2 XXXX... (4 bits each)
            [HideInInspector] public List<bool> LevelsDevTimesBeaten; // Level 0 Dev Time Beat, Level 1 Dev Time Beat, etc...
            [HideInInspector] public List<bool> LevelsCompleted;  // Level 0 Complete, Level 1 Complete, Level 2 Complete, etc..
            public int TapCount; // Total taps
            public bool UnlockedDevTimes; // If unlocked dev times
            public bool IsSFXMuted = false; // If sfx muted
            public bool IsMusicMuted = false; // If musics muted
            public bool IsHapticsMuted = false; // If haptics muted
            private float m_currentLevelTime = 0f; // current level time
            private TimerState m_currentTimerState; // Timer State (Paused, On, Off)

            // Save Tags which are saved to ES3
            private const string k_levelCollectables = "LEVEL_COLLECTABLES";
            private const string k_levelDevTimeBeaten = "LEVEL_DEVTIMES_COMPLETE";
            private const string k_tapCountTag = "TAP_COUNT";
            private const string k_unlockedDevTimesTag = "UNLOCKED_DEV_TIMES";
            private const string k_levelsCompletedTag = "LEVELS_COMPLETED";
            private const string k_optionsMusicTag = "MUSIC_SETTINGS";
            private const string k_optionsSFXTag = "SFX_SETTINGS";
            private const string k_optionsHapticsTag = "HAPTICS_SETTINGS";
            
            /// <summary>
            /// Awake
            /// </summary>
            void Awake() {
                // Setting up singleton design
                if(Instance) {
                    Debug.LogWarning($"More than 1 Save Manager in the scene, deleting {transform.name}");
                    Destroy(gameObject);
                    return;
                }
                Instance = this;
            }

            /// <summary>
            /// Start
            /// </summary>
            void Start()
            {
                InitializeStats();
            }

            /// <summary>
            /// Update
            /// </summary>
            void Update()
            {
                // Increment the current levels time for speedrunning long term retention
                if (m_currentTimerState == TimerState.On)
                {
                    m_currentLevelTime += Time.deltaTime;
                }
            }

            /// <summary>
            /// Resets and initializes all Saveable Stats and Loads them from the SaveFile
            /// </summary>
            private void InitializeStats()
            {
                // Declare
                var defaultCompleted = new List<bool>();
                var defaultDevTimeComplete = new List<bool>();
                var defaultCollectables = new List<int>();
                for (int i = 0; i < k_levelScenes; i++)
                {
                    defaultCompleted.Add(false);
                    defaultDevTimeComplete.Add(false);
                    defaultCollectables.Add(0);
                }

                // Initialize
                LevelsCompleted = ES3.Load(k_levelsCompletedTag, defaultCompleted);
                LevelsCollectables = ES3.Load(k_levelCollectables, defaultCollectables);
                LevelsDevTimesBeaten = ES3.Load(k_levelDevTimeBeaten, defaultDevTimeComplete);
                TapCount = ES3.Load(k_tapCountTag, 0);
                UnlockedDevTimes = ES3.Load(k_unlockedDevTimesTag, false);
                IsHapticsMuted = ES3.Load(k_optionsHapticsTag, true);
                IsMusicMuted = ES3.Load(k_optionsMusicTag, false);
                IsSFXMuted = ES3.Load(k_optionsSFXTag, false);

                // Update Options values and apply them
                UpdateIsMuted();

                // Debug save data
                if (DebugManager.Instance.DebugModeEnabled)
                {
                    Debug.Log("ALL GAME DATA LOADED FROM SAVE");
                    PrintAllSavedData();
                }

                // Call event
                SaveLoaded.Invoke();
            }

            /// <summary>
            /// @author Rose Briggs
            /// Set the mute state of the two audio busses
            /// </summary>
            private void UpdateIsMuted() {
                RuntimeManager.GetBus("bus:/Group_Music").setMute(IsMusicMuted);
                RuntimeManager.GetBus("bus:/Group_SFX").setMute(IsSFXMuted);
                HapticController.hapticsEnabled = IsHapticsMuted;
            }

            /// <summary>
            /// Saves all data
            /// </summary>
            public void SaveAll()
            {
                // Save level data
                ES3.Save(k_levelsCompletedTag, LevelsCompleted);
                ES3.Save(k_levelCollectables, LevelsCollectables);
                ES3.Save(k_levelDevTimeBeaten, LevelsDevTimesBeaten);
                ES3.Save(k_tapCountTag, TapCount);
                ES3.Save(k_unlockedDevTimesTag, UnlockedDevTimes);

                // Save options data
                ES3.Save(k_optionsHapticsTag, IsHapticsMuted);
                ES3.Save(k_optionsMusicTag, IsMusicMuted);
                ES3.Save(k_optionsSFXTag, IsSFXMuted);

                // Debug we saved
                if (DebugManager.Instance.DebugModeEnabled)
                {
                    Debug.Log("ALL DATA SUCCESSFULLY SAVED");

                    PrintAllSavedData();
                }

                // Call data event
                DataSaved.Invoke();
            }

            /// <summary>
            /// Deletes all data
            /// </summary>
            public void DeleteAllData()
            {
                // Store the muted values so they arent deleted
                bool sfxMuted = IsSFXMuted;
                bool musicMuted = IsMusicMuted;
                bool hapticsMuted = IsHapticsMuted;

                // Delete keys
                ES3.DeleteKey(k_levelsCompletedTag);
                ES3.DeleteKey(k_levelCollectables);
                ES3.DeleteKey(k_levelDevTimeBeaten);
                ES3.DeleteKey(k_tapCountTag);
                ES3.DeleteKey(k_unlockedDevTimesTag);
                ES3.DeleteKey(k_optionsHapticsTag);
                ES3.DeleteKey(k_optionsMusicTag);
                ES3.DeleteKey(k_optionsSFXTag);

                // Initialize stats to default value
                InitializeStats();

                // Debug new data deleted
                if (DebugManager.Instance.DebugModeEnabled)
                {
                    Debug.Log("ALL SAVE FILES DELETED");

                    PrintAllSavedData();
                }

                // Call Save Deleted
                SaveDeleted.Invoke();

                // Restore muted values for Options Menu
                IsSFXMuted = sfxMuted;
                IsMusicMuted = musicMuted;
                IsHapticsMuted = hapticsMuted;
                UpdateIsMuted();

                // Re-save all values to save default values
                SaveAll();
            }

            /// <summary>
            /// Sets the collectable data saved for this level
            /// </summary>
            /// <param name="levelIndex"></param>
            /// <param name="collectableBits"></param>
            public void SetLevelCollectable(int levelIndex, int collectableBits) {
                if (levelIndex == -1) return;
                
                LevelsCollectables[levelIndex] = LevelsCollectables[levelIndex] | collectableBits;
                ES3.Save(k_levelCollectables, LevelsCollectables);
            }

            /// <summary>
            /// Note: This method is only called when Save Data is changed and can be toggled in DebugManager
            /// Displays all Saved Data and their values for debugging
            /// </summary>
            private void PrintAllSavedData()
            {
                Debug.Log("--- FULL SAVE DATA START ---");

                for (int i = 0; i < LevelsCompleted.Count; i++)
                {
                    Debug.LogFormat("Level {0}: Completed? {1}.", i, LevelsCompleted[i]);
                }

                for (int i = 0; i < LevelsCollectables.Count; i++)
                {
                    Debug.LogFormat("Level {0}: Collectables = {1}.", i, LevelsCollectables[i]);
                }

                for (int i = 0; i < LevelsDevTimesBeaten.Count; i++)
                {
                    Debug.LogFormat("Level {0}: Dev Time Beaten = {1}.", i, LevelsDevTimesBeaten[i]);
                }

                Debug.LogFormat("Total Tap Count: {0}", TapCount);
                Debug.LogFormat("Dev Times Unlocked: {0}", UnlockedDevTimes);
                Debug.LogFormat("Haptics are Muted: {0}", IsHapticsMuted);
                Debug.LogFormat("Music is Muted: {0}", IsMusicMuted);
                Debug.LogFormat("SFX are Muted: {0}", IsSFXMuted);
                Debug.Log("--- FULL SAVE DATA END ---");
            }

            /// <summary>
            /// Starts Game Timer
            /// </summary>
            public void StartTimer()
            {
                m_currentTimerState = TimerState.On;
            }

            /// <summary>
            /// Resets Game Timer
            /// </summary>
            public void ResetTimer()
            {
                m_currentTimerState = TimerState.Off;
                m_currentLevelTime = 0f;
            }

            /// <summary>
            /// Pauses Game Timer
            /// </summary>
            public void PauseTimer()
            {
                m_currentTimerState = TimerState.Paused;
            }

            /// <summary>
            /// Submits Game Timer with fastest time and saves all information
            /// Called after Winning a full level
            /// </summary>
            public void SubmitStats(int currentLevelNumber)
            {
                LevelsCompleted[currentLevelNumber] = true;

                // Combine collectables if level exists
                if (LevelManager.Instance.IsLevelLoaded()) {
                    // get current
                    int alreadyCollected = GetLevelCollectable(currentLevelNumber);
                    // get new
                    int newCollected = LevelManager.Instance.GetCollectables();
                    LevelsCollectables[currentLevelNumber] = alreadyCollected | newCollected; // combine
                }
                
                SaveAll();
                ResetTimer();
            }

            /// <summary>
            /// Resets all level completion
            /// </summary>
            public void ResetAllLevelCompletion()
            {
                LevelsCompleted.Clear();
            }

            /// <summary>
            /// Returns the furthest completed level index, returns -1 if 0 is not even finished
            /// </summary>
            /// <returns></returns>
            public int GetFurthestCompletedIndex()
            {   
                int index = -1;

                foreach (bool item in LevelsCompleted)
                {
                    if (item)
                    {
                        index++;
                    }
                }

                return index;    
            }

            /// <summary>
            /// Saves on exit
            /// In LevelSelect Script: Saves on Scene change
            /// </summary>
            public void OnApplicationQuit()
            {
                SaveAll();
            }


            // collectables author: James Prendergast
            /// <summary>
            /// returns the collectable data saved for this level
            /// </summary>
            /// <param name="levelIndex">what index to read</param>
            /// <returns>the bits of the collected collectables</returns>
            public int GetLevelCollectable(int levelIndex) {
                return LevelsCollectables[levelIndex];
            }
        }
`},
        ],
        designSnippets: [
            {
            title: "Build Pipeline",
            image: `${import.meta.env.BASE_URL}assets/BuildPipeline.png`,
            },
            {
            title: "Indoor & Outdoor Design",
            image: `${import.meta.env.BASE_URL}assets/IndoorOutdoor.png`,
            },
            {
            title: "Screen Design",
            image: `${import.meta.env.BASE_URL}assets/DropOffDragonDesign.png`,
            },
        ],
        tags: [
        { id: 1, name: "IOS", color: "bg-blue-600/30 text-blue-200 border-blue-500/30" },
        { id: 2, name: "Google Play", color: "bg-green-600/30 text-green-200 border-green-500/30" },
        { id: 3, name: "PlasticSCM", color: "bg-red-600/30 text-red-200 border-red-500/30" },
        { id: 4, name: "C#", color: "bg-orange-600/30 text-orange-200 border-orange-500/30" },
        { id: 5, name: "Unity", color: "bg-gray-600/30 text-gray-200 border-gray-500/30" },
        ],
    },

    // Fobia Fights
    {
    id: 2,
    title: "Fobia Fights",
 
    // Descriptions
    description: "A Fast-Paced Online Multiplayer Brawler",
    subDescription: [],
 
    // Links
    href: "",
    github: "",
    liveDemo: "",
 
    // Media Pictures lol with hovering images that get cycled
    image: `${import.meta.env.BASE_URL}assets/FobiaFights.png`,
    hoverImage: [
      `${import.meta.env.BASE_URL}assets/FobiaFightsScreenshot1.png`,
      `${import.meta.env.BASE_URL}assets/FobiaFightsScreenshot2.png`,
      `${import.meta.env.BASE_URL}assets/FobiaFightsScreenshot3.png`,
    ],

    // YouTube link for trailer
    youtubeUrl: "https://youtu.be/w5foFyxMQHI",
 
    // ProjectDetails — header
    overview:
      "Dive into a chaotic, fear-fueled multiplayer brawl, where you’ll outwit, scare, and eliminate your friends using their deepest, darkest fears - all while they’re plotting to do the same to you! Designed to spark late night chaos between friends, this game truly shines when played with your entire friend group.",
 
    // ProjectDetails — details grid
    details: {
      role: "Solo Developed by Jake DeRoma (JakerDevs)",
      type: "Multiplayer PvP Game",
      platform: "Windows, Steam",
      language: "C#",
      software: ["Unity", "Pun2", "Aseprite", "FL Studio", "Audactiy", "DaVinci Resolve", ],
      duration: "2 years (On and Off)",
    },
 
    // ProjectDetails — code snippets
    codeSnippets: [
      {
        title: "Lobby Creation and Joining",
        language: "C#",
        code: `/// <summary>
/// Joins a Pun2 room or creates a new one depending on game settings:
/// Handles both private and public matchmaking logic, including room configuration,
/// custom properties, and accessing Steam API
/// </summary>
public void JoinRoom()
{
    // Validate that the player has all required unlocks before allowing matchmaking
    // returns early if any required unlocks are missing
    CheckPlayerLoadoutUnlocks(); 

    Debug.Log("Connecting to Pun2...");

    RoomOptions roomOptions;

    // PRIVATE GAME LOGIC
    if (gameSettings.isPrivateGame)
    {
        // If no room code exists, generate a new private lobby code
        if (string.IsNullOrEmpty(roomNameToJoin))
        {
            do
            {
                code = gameSettings.GenerateLobbyCode();
            }
            while (!gameSettings.IsValidLobbyCode(code));

            roomNameToJoin = code;
            Debug.Log("Creating new private room: " + roomNameToJoin);
        }
        else
        {
            Debug.Log("Joining existing private room: " + roomNameToJoin);
        }

        // Persist room name in the global game settings so everyone can see
        gameSettings.roomName = roomNameToJoin;

        // Make private room settings
        roomOptions = new RoomOptions
        {
            MaxPlayers = 6,
            IsOpen = true,
            IsVisible = true,

            // Custom data shared across all clients in the room
            CustomRoomProperties = new Hashtable
            {
                { "gameTime", gameSettings.gameTime },
                { "itemSpawnRate", gameSettings.itemSpawnRate },
                { "private", true },
                { "mapNumber", gameSettings.mapNumber },
                { "phobiasInGame", gameSettings.phobiasInTheGame },
                { "region", PhotonNetwork.CloudRegion }
            },

            // Properties exposed in the lobby
            CustomRoomPropertiesForLobby = new string[]
            {
                "gameTime",
                "itemSpawnRate",
                "private",
                "mapNumber",
                "phobiasInGame",
                "region"
            }
        };
    }

    // PUBLIC GAME LOGIC
    else
    {
        // Use Steam username as part of the room name if available
        if (Steamworks.SteamClient.IsValid)
        {
            roomNameToJoin = SteamManager.Instance.PlayerSteamName + "'s "+ RandomAdjective() + " Room: ";
        }
        else
        {
            // Fallback
            roomNameToJoin = "?";
        }

        gameSettings.roomName = roomNameToJoin;
        Debug.Log("Joining public room");

        // Configure public matchmaking room settings
        roomOptions = new RoomOptions
        {
            MaxPlayers = 6,
            IsOpen = true,
            IsVisible = true,

            CustomRoomProperties = new Hashtable
            {
                { "gameTime", gameSettings.gameTime },
                { "itemSpawnRate", gameSettings.itemSpawnRate },
                { "private", false },
                { "mapNumber", gameSettings.mapNumber },
                { "phobiasInGame", gameSettings.phobiasInTheGame },
                { "region", PhotonNetwork.CloudRegion }
            },

            CustomRoomPropertiesForLobby = new string[]
            {
                "gameTime",
                "itemSpawnRate",
                "private",
                "mapNumber",
                "phobiasInGame"
            }
        };
    }

    // PHOTON ROOM CONNECTION

    // Join existing room or create it if it doesn't exist with the proper roomOptions
    PhotonNetwork.JoinOrCreateRoom(roomNameToJoin, roomOptions, null);

    // UI transition: hide name entry and show connecting screen
    nameUI.SetActive(false);
    connectingUI.SetActive(true);
}`,
      },
      {
        title: "Multiplayer Audio Controller",
        language: "C#",
        code: `/// <summary>
/// MultiplayerAudioController using Pun2:
/// This component provides control over multiple NamedAudioSources,
/// allowing synchronized playback across clients (self, others, or all)
/// </summary>
[RequireComponent(typeof(PhotonView))]
public class MultiplayerAudioController : MonoBehaviourPun
{
    /// <summary>
    /// Serializable wrapper that binds a name to an AudioSource
    /// </summary>
    [System.Serializable]
    public class NamedAudioSource
    {
        [Tooltip("Unique name for the AudioSource")]
        public string sourceName;

        [Tooltip("Reference to the AudioSource")]
        public AudioSource source;

        [Tooltip("If true, the audio will restart from the beginning on each play")]
        public bool alwaysRestart = true;
    }

    [Header("Audio Sources")]
    [Tooltip("List of named AudioSources that can be controlled through RPC or local calls")]
    [SerializeField] private List<NamedAudioSource> audioSources = new List<NamedAudioSource>();

    [Space(10)]

    /// <summary>
    /// Dictionary for fast runtime access to AudioSources by name
    /// </summary>
    private Dictionary<string, AudioSource> audioSourceDictionary = new Dictionary<string, AudioSource>();

    /// <summary>
    /// Initializes the dictionary for fast audio retrieval
    /// </summary>
    private void Awake()
    {
        foreach (var namedSource in audioSources)
        {
            if (namedSource.source == null)
            {
                Debug.LogWarning("AudioSource is null for: " + namedSource.sourceName);
                continue;
            }

            if (!audioSourceDictionary.ContainsKey(namedSource.sourceName))
            {
                audioSourceDictionary.Add(namedSource.sourceName, namedSource.source);
            }
        }
    }

    #region Play Methods

    /// <summary>
    /// Plays an audio source on all connected clients
    /// </summary>
    public void PlayForAll(string sourceName)
    {
        if (!ValidateSource(sourceName)) return;

        photonView.RPC("RPC_PlaySource", RpcTarget.All, sourceName);
    }

    /// <summary>
    /// Plays an audio source only on the local client
    /// </summary>
    public void PlayForSelf(string sourceName)
    {
        if (!ValidateSource(sourceName)) return;

        PlaySourceInternal(sourceName);
    }

    /// <summary>
    /// Plays audio locally and optionally triggers on a target player
    /// </summary>
    public void PlayForSelfAndTarget(string sourceName, GameObject targetPlayer)
    {
        if (!ValidateSource(sourceName)) return;

        // Play locally
        PlaySourceInternal(sourceName);

        // Play on target player if valid
        if (targetPlayer != null && targetPlayer != this.gameObject)
        {
            PhotonView targetView = targetPlayer.GetComponent<PhotonView>();
            if (targetView != null)
            {
                photonView.RPC("RPC_PlaySource", targetView.Owner, sourceName);
            }
        }
    }

    /// <summary>
    /// Plays an audio source on all clients except the local one
    /// </summary>
    public void PlayForOthers(string sourceName)
    {
        if (!ValidateSource(sourceName)) return;

        photonView.RPC("RPC_PlaySource", RpcTarget.Others, sourceName);
    }

    /// <summary>
    /// RPC call used to trigger play on remote clients
    /// </summary>
    [PunRPC]
    private void RPC_PlaySource(string sourceName)
    {
        PlaySourceInternal(sourceName);
    }

    /// <summary>
    /// Core play sound logic executed locally on all clients
    /// Handles restart logic here
    /// </summary>
    private void PlaySourceInternal(string sourceName)
    {
        if (audioSourceDictionary.TryGetValue(sourceName, out AudioSource source))
        {
            if (!source.enabled)
                source.enabled = true;
            
            // Find the AudioSource
            var namedSource = audioSources.Find(x => x.sourceName == sourceName);

            // Play the sound with restart logic
            if (namedSource.alwaysRestart || !source.isPlaying)
            {
                if (namedSource.alwaysRestart)
                    source.Stop();

                source.Play();
            }
        }
    }

    #endregion

    #region Helper Methods

    /// <summary>
    /// Validates the requested audio source
    /// </summary>
    private bool ValidateSource(string sourceName)
    {
        if (!audioSourceDictionary.ContainsKey(sourceName))
        {
            return false;
        }
        return true;
    }

    /// <summary>
    /// Returns the status of an audio source
    /// </summary>
    public bool IsPlaying(string sourceName)
    {
        if (audioSourceDictionary.TryGetValue(sourceName, out AudioSource source))
        {
            return source.isPlaying;
        }
        return false;
    }

    #endregion
}`,
      },
    ],
 
    // ProjectDetails — design highlight images
    designSnippets: [
      {
        title: "PhobiaHandler",
        image: `${import.meta.env.BASE_URL}assets/PhobiaHandler.png`,
      },
    ],
 
    // Tags shown on card and in Technologies section
    tags: [
        { id: 1, name: "Steam", color: "bg-blue-600/30 text-blue-200 border-blue-500/30" },
        { id: 2, name: "PUN 2", color: "bg-teal-600/30 text-teal-200 border-teal-500/30" },
        { id: 3, name: "GitHub", color: "bg-red-600/30 text-red-200 border-red-500/30" },
        { id: 4, name: "C#", color: "bg-orange-600/30 text-orange-200 border-orange-500/30" },
        { id: 5, name: "Unity",  color: "bg-gray-600/30 text-gray-200 border-gray-500/30" },
    ],
  },
];

export const mySocials = [
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/jakederoma/",
    icon: `${import.meta.env.BASE_URL}assets/socials/linkedIn.svg`,
  },
];