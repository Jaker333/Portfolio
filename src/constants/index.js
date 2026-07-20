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
        `${import.meta.env.BASE_URL}assets/DropOffDragonScreenshot2.png`,
        `${import.meta.env.BASE_URL}assets/DropOffDragonScreenshot3.png`,
        ],
        youtubeUrl: "https://youtube.com/shorts/nVyNt1xzX6Q?si=I8IezHBfmcQ_8k_y",
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
        { title: "Tab label", language: "C#", code: `// paste code here` },
        ],
        designSnippets: [
            {
            title: "Build Pipeline",
            image: `${import.meta.env.BASE_URL}assets/BuiltPipeline.png`,

            title: "Level Design",
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
        language: "csharp",
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
        language: "csharp",
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