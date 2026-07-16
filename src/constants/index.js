export const myProjects = [
  {
    id: 1,
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
      "Dive into a chaotic, fear-fueled multiplayer brawl, where you’ll outwit, scare, and eliminate your friends using their deepest, darkest fears — all while they’re plotting to do the same to you! Designed to spark late night chaos between friends, this game truly shines when played with your entire friend group.",
 
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
/// Joins an existing Photon room or creates a new one depending on game settings.
/// Handles both private and public matchmaking logic, including room configuration,
/// custom properties, and Steam-based naming (if available).
/// </summary>
public void JoinRoom()
{
    // Validate that the player has all required unlocks before allowing matchmaking
    // returns early if any required unlocks are missing
    CheckPlayerLoadoutUnlocks(); 

    Debug.Log("Connecting to Photon...");

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
            Debug.Log($"Creating new private room: {roomNameToJoin}");
        }
        else
        {
            Debug.Log($"Joining existing private room: {roomNameToJoin}");
        }

        // Persist room name in global game settings
        gameSettings.roomName = roomNameToJoin;

        // Configure private room settings
        roomOptions = new RoomOptions
        {
            MaxPlayers = 6,
            IsOpen = true,
            IsVisible = true,

            // Custom metadata shared across all clients in the room
            CustomRoomProperties = new Hashtable
            {
                { "gameTime", gameSettings.gameTime },
                { "itemSpawnRate", gameSettings.itemSpawnRate },
                { "private", true },
                { "mapNumber", gameSettings.mapNumber },
                { "phobiasInGame", gameSettings.phobiasInTheGame },
                { "region", PhotonNetwork.CloudRegion }
            },

            // Properties exposed in the Photon lobby for filtering/searching
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
            roomNameToJoin = SteamManager.Instance.PlayerSteamName
                             + "'s "
                             + RandomAdjective()
                             + " Room: ";
        }
        else
        {
            // Fallback: let Photon generate a random room name
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

    // Join existing room or create it if it doesn't exist
    PhotonNetwork.JoinOrCreateRoom(roomNameToJoin, roomOptions, null);

    // UI transition: hide name entry and show connecting screen
    nameUI.SetActive(false);
    connectingUI.SetActive(true);
}`,
      },
      {
        title: "Multiplayer Audio Controller",
        language: "csharp",
        code: `
/// <summary>
/// MultiplayerAudioController built on Photon PUN 2.
/// 
/// This component provides centralized control over multiple NamedAudioSources,
/// allowing synchronized playback across clients (self, others, or all).
/// </summary>
[RequireComponent(typeof(PhotonView))]
public class MultiplayerAudioController : MonoBehaviourPun
{
    /// <summary>
    /// Serializable wrapper that binds a human readable name to an AudioSource.
    /// </summary>
    [System.Serializable]
    public class NamedAudioSource
    {
        [Tooltip("Unique identifier used to reference this AudioSource.")]
        public string sourceName;

        [Tooltip("Reference to the Unity AudioSource component.")]
        public AudioSource source;

        [Tooltip("If true, the audio will restart from the beginning on each play call.")]
        public bool alwaysRestart = true;
    }

    [Header("Audio Sources")]
    [Tooltip("List of named AudioSources that can be controlled via RPC or local calls.")]
    [SerializeField] private List<NamedAudioSource> audioSources = new List<NamedAudioSource>();

    [Space(10)]

    /// <summary>
    /// Lookup dictionary for fast runtime access to AudioSources by name.
    /// </summary>
    private Dictionary<string, AudioSource> audioSourceDictionary = new Dictionary<string, AudioSource>();

    /// <summary>
    /// Initializes the lookup dictionary for fast audio retrieval.
    /// Ensures all named AudioSources are valid.
    /// </summary>
    private void Awake()
    {
        foreach (var namedSource in audioSources)
        {
            if (namedSource.source == null)
            {
                Debug.LogWarning($"AudioSource is null for: {namedSource.sourceName}");
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
    /// Plays an audio source on all connected clients.
    /// </summary>
    public void PlayForAll(string sourceName)
    {
        if (!ValidateSource(sourceName)) return;
        photonView.RPC("RPC_PlaySource", RpcTarget.All, sourceName);
    }

    /// <summary>
    /// Plays an audio source only on the local client.
    /// </summary>
    public void PlayForSelf(string sourceName)
    {
        Debug.Log($"Attempting to play: {sourceName}");
        if (!ValidateSource(sourceName)) return;

        Debug.Log($"Found source: {sourceName}");
        PlaySourceInternal(sourceName);
    }

    /// <summary>
    /// Plays audio locally and optionally triggers playback on a target player.
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
            else
            {
                Debug.LogWarning("Target player doesn't have a PhotonView component");
            }
        }
    }

    /// <summary>
    /// Plays an audio source on all clients except the local one.
    /// </summary>
    public void PlayForOthers(string sourceName)
    {
        if (!ValidateSource(sourceName)) return;
        photonView.RPC("RPC_PlaySource", RpcTarget.Others, sourceName);
    }

    /// <summary>
    /// RPC call used to trigger playback on remote clients.
    /// </summary>
    [PunRPC]
    private void RPC_PlaySource(string sourceName)
    {
        PlaySourceInternal(sourceName);
    }

    /// <summary>
    /// Core playback logic executed locally on all clients.
    /// Handles restart logic and playback state validation.
    /// </summary>
    private void PlaySourceInternal(string sourceName)
    {
        if (audioSourceDictionary.TryGetValue(sourceName, out AudioSource source))
        {
            if (!source.enabled)
                source.enabled = true;

            var namedSource = audioSources.Find(x => x.sourceName == sourceName);

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
    /// Validates that the requested audio source exists in the registry.
    /// </summary>
    private bool ValidateSource(string sourceName)
    {
        if (!audioSourceDictionary.ContainsKey(sourceName))
        {
            Debug.LogWarning($"AudioSource not found: {sourceName}");
            return false;
        }
        return true;
    }

    /// <summary>
    /// Returns whether a named audio source is currently playing.
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
        title: "Phobia Handler",
        image: "",
      },
    ],
 
    // Tags shown on card and in Technologies section
    tags: [
      { id: 1, name: "C#",  path: `${import.meta.env.BASE_URL}assets/logos/csharp.svg`, color: "bg-purple-600/30 text-purple-200 border-purple-500/30" },
      { id: 2, name: "Unity", path: `${import.meta.env.BASE_URL}assets/logos/unity.svg`, color: "bg-gray-600/30 text-gray-200 border-gray-500/30" },
      { id: 3, name: "PUN 2", path: `${import.meta.env.BASE_URL}assets/logos/unity.svg`, color: "bg-green-600/30 text-green-200 border-green-500/30" },
      { id: 4, name: "Steam", path: `${import.meta.env.BASE_URL}assets/logos/steam.svg`, color: "bg-blue-600/30 text-blue-200 border-blue-500/30" },
    ],
  },
  // Drop Off Dragon
  {
    id: 2,
    title: "Project Name",
    description: "One-line elevator pitch shown on the card.",
    subDescription: [
      "Key feature or highlight 1",
    ],
    href: "",
    github: "",
    liveDemo: "",
    image: "https://jaker333.github.io/Portfolio/assets/projects/project.png",
    hoverImage: "https://jaker333.github.io/Portfolio/assets/projects/project-hover.png", // optional, crossfades on hover
    youtubeUrl: "",
    overview: "Longer paragraph shown at the top of the detail modal.",
    details: {
      role: "",
      type: "",
      platform: "",
      language: "",
      software: [],
      duration: "",
    },
    codeSnippets: [
      { title: "Tab label", language: "C#", code: `// paste code here` },
    ],
    designSnippets: [
      { title: "Screen name", image: "https://jaker333.github.io/Portfolio/assets/projects/project-screen.png" },
    ],
    tags: [
      { id: 1, name: "React", path: "https://jaker333.github.io/Portfolio/assets/logos/react.svg" },
    ],
  },
  // Other game
  {
    id: 3,
    title: "Project Name",
    description: "One-line elevator pitch shown on the card.",
    subDescription: [
      "Key feature or highlight 1",
    ],
    href: "",
    github: "",
    liveDemo: "",
    image: "https://jaker333.github.io/Portfolio/assets/projects/project.png",
    hoverImage: "https://jaker333.github.io/Portfolio/assets/projects/project-hover.png", // optional, crossfades on hover
    youtubeUrl: "",
    overview: "Longer paragraph shown at the top of the detail modal.",
    details: {
      role: "",
      type: "",
      platform: "",
      language: "",
      software: [],
      duration: "",
    },
    codeSnippets: [
      { title: "Tab label", language: "C#", code: `// paste code here` },
    ],
    designSnippets: [
      { title: "Screen name", image: "https://jaker333.github.io/Portfolio/assets/projects/project-screen.png" },
    ],
    tags: [
      { id: 1, name: "React", path: "https://jaker333.github.io/Portfolio/assets/logos/react.svg" },
    ],
  },
  // Other game
  {
    id: 4,
    title: "Project Name",
    description: "One-line elevator pitch shown on the card.",
    subDescription: [
      "Key feature or highlight 1",
    ],
    href: "",
    github: "",
    liveDemo: "",
    image: "https://jaker333.github.io/Portfolio/assets/projects/project.png",
    hoverImage: "https://jaker333.github.io/Portfolio/assets/projects/project-hover.png", // optional, crossfades on hover
    youtubeUrl: "",
    overview: "Longer paragraph shown at the top of the detail modal.",
    details: {
      role: "",
      type: "",
      platform: "",
      language: "",
      software: [],
      duration: "",
    },
    codeSnippets: [
      { title: "Tab label", language: "C#", code: `// paste code here` },
    ],
    designSnippets: [
      { title: "Screen name", image: "https://jaker333.github.io/Portfolio/assets/projects/project-screen.png" },
    ],
    tags: [
      { id: 1, name: "React", path: "https://jaker333.github.io/Portfolio/assets/logos/react.svg" },
    ],
  },
  // Other game
  {
    id: 5,
    title: "Project Name",
    description: "One-line elevator pitch shown on the card.",
    subDescription: [
      "Key feature or highlight 1",
    ],
    href: "",
    github: "",
    liveDemo: "",
    image: "https://jaker333.github.io/Portfolio/assets/projects/project.png",
    hoverImage: "https://jaker333.github.io/Portfolio/assets/projects/project-hover.png", // optional, crossfades on hover
    youtubeUrl: "",
    overview: "Longer paragraph shown at the top of the detail modal.",
    details: {
      role: "",
      type: "",
      platform: "",
      language: "",
      software: [],
      duration: "",
    },
    codeSnippets: [
      { title: "Tab label", language: "C#", code: `// paste code here` },
    ],
    designSnippets: [
      { title: "Screen name", image: "https://jaker333.github.io/Portfolio/assets/projects/project-screen.png" },
    ],
    tags: [
      { id: 1, name: "React", path: "https://jaker333.github.io/Portfolio/assets/logos/react.svg" },
    ],
  },
  // Other game
  {
    id: 6,
    title: "Project Name",
    description: "One-line elevator pitch shown on the card.",
    subDescription: [
      "Key feature or highlight 1",
    ],
    href: "",
    github: "",
    liveDemo: "",
    image: "https://jaker333.github.io/Portfolio/assets/projects/project.png",
    hoverImage: "https://jaker333.github.io/Portfolio/assets/projects/project-hover.png", // optional, crossfades on hover
    youtubeUrl: "",
    overview: "Longer paragraph shown at the top of the detail modal.",
    details: {
      role: "",
      type: "",
      platform: "",
      language: "",
      software: [],
      duration: "",
    },
    codeSnippets: [
      { title: "Tab label", language: "C#", code: `// paste code here` },
    ],
    designSnippets: [
      { title: "Screen name", image: "https://jaker333.github.io/Portfolio/assets/projects/project-screen.png" },
    ],
    tags: [
      { id: 1, name: "React", path: "https://jaker333.github.io/Portfolio/assets/logos/react.svg" },
    ],
  },
];

export const mySocials = [
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/jakederoma/",
    icon: "/assets/socials/linkedIn.svg",
  },
];