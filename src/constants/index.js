export const myProjects = [
  // Drop Off Dragon
  {
      id: 1,
      slug: "drop-off-dragon",
      title: "Drop Off Dragon",
      titleColor: "#05F2DB", // color of the bolded, centered project name on the details page
      description: "2D Mobile Action Platformer, Shipped Title with MassDiGI games. Summer 2026.",
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
      
      overview: `
      **Drop Off Dragon** is a 2D Action Platformer made for all ages released on **iOS** and **Android** platforms. Storm the castle, crash through obstacles, and break into vaults to steal gold to prove to Mama Dragon that you can be as strong as her!

      As part of **MassDiGI's 2026 Summer Innovation Program**, I worked as a **designer**, **programmer**, and **build master** on a team of **8 talented developers**. We were tasked by our director to design a concept and **publish a title in 3 months**. This process made me learn how to **collaborate** in a team in a professional setting by using **Miro**, **Kanban**, and **Scrum**.

      We started this project off by **prototyping** the idea using similar comparable games. We implemented a dirty build which showcased the core mechanic and pitched our idea to the director. Once it was approved, we moved into production of **Drop Off Dragon** which is now available on **iOS** and **Google Play**!
      
      `,

      details: {
      role: "Build Master, Programmer, Technical Designer",
      type: "2D Action Platformer",
      platform: "Mobile Game (iOS, Google Play)",
      language: "C#",
      software: ["Unity", "PlasticSCM", "FMOD", "Fastlane", "Testflight", "App Store Connect", "Google Play Console"],
      duration: "3 months, Summer 2026",
      },

      // Shown right under the About section, before the custom sections below
      imageLinks: [
      {
          src: `${import.meta.env.BASE_URL}assets/iOSBadge.png`,
          href: "https://apps.apple.com/us/app/drop-off-dragon/id6778522561", // App Store link
          caption: "",
          compact: true,
      },
      {
          src: `${import.meta.env.BASE_URL}assets/GooglePlayBadge.png`,
          href: "https://play.google.com/store/apps/details?id=com.MassDiGI.ChonkDragon&hl=en_US", // Google Play link
          caption: "",
          compact: true,
      },
      ],

      sections: [
      {
          title: "Milestones",
          blocks: [
          {
              type: "text",
              heading: "Dirty Build",
              body: `During our Dirty Build Phase of development, my team and I began focusing on what the core mechanic and plus one mechanic we wanted to add. Taking inspiration from games like **King of Thieves** and **Super Mario Run**, we loved the idea for a 2D Action platformer.
              
              Our core mechanic ended up being **"Auto Runner"** and our plus one was **"Ground Pound"** using only tap inputs.
              
              For this milestone, we implemented:
              • **2D Auto-runner physics, wall jumping, ground pound**
              • **Hazard Pogoing with ground pound**
              • **Recieving Tap input**
              • **Tap to start (dynamic pausing)**
              • **Win Condition**
              `,
          },
          {
            type: "video",
            src: `${import.meta.env.BASE_URL}assets/DirtyBuildGIF.gif`,
            caption: "Early footage of our Dirty Build concept",
          },
          {
            type: "text",
            heading: "Vertical Slice",
            body: `During our Vertical Slice Phase of development, I worked closely with my good friend, **Rose Briggs**, and we **partner programmed** the **PlayerController.cs** script. Through partner programming, we were able to work effectively and quickly. By the end of the phase, we finalized **player movement**.
            
              For this milestone, we implemented:
              • **Player State Machine**
              • **Gargoyle Enemy Design**
              • **Level & Tilemap System**
              • **Breakable Tiles**
              • **Screen transitioning**
              • **Camera shake**`,
          },
          {
            type: "video",
            src: `${import.meta.env.BASE_URL}assets/VerticalSliceGIF.gif`,
            caption: "Early footage of our Vertical Slice",
          },
          {
              type: "text",
              heading: "Alpha",
              body: `Here our some of the things I worked on during Alpha:
              
              • **Save Manager** - Handles all save data and is compatible for iOS and Android.
              • **FMOD Manager** - Started framework for playing oneshots, stingers, and loops.
              • **Feedbacks Manager** - Using Unity Asset "FEEL," I made an easy manager to juice our mechanics with **haptics** compatibility. 
              • **Level Mechanics** - Feature freezed our mechanics: Acid, Slam Gates, Gargoyles, Spikes, etc
              • **Player Animation** - Worked with **Rose Briggs** on implementing the **Player Animation** that **Zoe Yang** animated.
              • **Paper prototyped levels** - Using note cards, I sketched levels and then brought those approved ideas into engine.
              `,
          },
          {
            type: "images",
            items: [
              { src: `${import.meta.env.BASE_URL}assets/DropOffDragonScreenshot1.png`, caption: "Slam Gates, Popping Gargoyles" },
              { src: `${import.meta.env.BASE_URL}assets/DropOffDragonScreenshot2.PNG`, caption: "Ground pounding spikes pogo" },
              { src: `${import.meta.env.BASE_URL}assets/DropOffDragonScreenshot3.PNG`, caption: "Gargoyles above Acid" },
            ],
          },
          {
              type: "text",
              heading: "Beta",
              body: `During the Beta Phase of development, I spent the most time working on **level design** and polishing mechanics:
              
              For this milestone, we implemented:
              • **Bug Fixes**
              • **Unique Backgrounds**
              • **Miscellaneous art assets**
              • **Our 10 levels refined**
              `,
          },
          {
            type: "images",
            items: [
              { src: `${import.meta.env.BASE_URL}assets/ChapelScreenshot.png`, caption: "Designed the Chapel Level" },
              { src: `${import.meta.env.BASE_URL}assets/TreasureScreenshot.png`, caption: "Implemented the Win Gold Pile" },
              { src: `${import.meta.env.BASE_URL}assets/JumpScreenshot.png`, caption: "Brewery Screen" },
            ],
          },
          {
              type: "text",
              heading: "Release",
              body: "During the Beta Phase of development, I primarily focued on my duties as **Build Master**. **App Store Connect** and **Google Play Console** took a lot of time to set up and get approved.",
          },
          {
            type: "image",
            src: `${import.meta.env.BASE_URL}assets/BabyDragonBanner.png`,
            caption: "",
          },
          {
              type: "text",
              heading: "",
              body: `Besides getting the App pages ready, I polished and had others playtest the levels to try and level the skill floor and ceiling to be as enjoyable as possible for all ages.
              
              It was such an amazing experience releasing Drop Off Dragon with my team (friends):
              **Zoe Yang** (drew Jake Mirror on home page), **Bashar Alqassar**, **Cooper Bulmash**, **Claire Mayfield**, **Rose Briggs**, **James Prendergast**, and **Marilee Rodriguez**! 
              `,
          },
          ],
      },
      {
          title: "My Role in Design",
          blocks: [
          {
              type: "text",
              heading: "FMOD",
              body: `Working on the **FMOD integration**, I got to work closely with our Audio Designer, **Claire Mayfield**, who gave me a different perspective on when sounds should play. 
              
              I coded a system that allows for **cross-fading music transitions** when entering **indoor** and **outdoor** parts of the levels. Claire worked on making the instruments fit indoor and outdoor aesthetics even using **live recorded violin**.
              
              We also worked together on **pitch randomization** and **low-pass filters** that made the game sound more pleasing.

              **(Here is my method that handles cross-fading music transitions on changing music states)**
              `,
          },
          {
            type: "code",
            heading: "Update Music State Method",
            language: "",
            code: `/// <summary>
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
}`,
          },
          {
              type: "text",
              heading: "Designing Levels",
              body: `Using the knowledge I gained from the **audio designer** and **artists**, I made levels that truly immersed the player with the environment through **art**, **music**, and **sound**.
              
              As a **technical game designer**, I made each screen with a specific **message** or **purpose** in mind. With all these tools, I made levels with **quality**, **purpose**, and that fit our **Level Design Do's and Don'ts**.`,
          },
          {
              type: "slides", // embeds a Google Slides deck
              url: "https://docs.google.com/presentation/d/1GuyFUnTfL2LRFVD1jMucTOiCYOKO9BG-MynpWYGEc0E/edit?usp=sharing",
              caption: "Game design pitch deck",
          },
          ],
      },
      {
          title: "Build Master Tasks",
          blocks: [
          {
              type: "text",
              heading: "",
              body: `As our team's **Build Master** for **MassDiGI's 2026 Summer Innovation Program**, I was in charge of handling all **Cloud Building** for **Drop Off Dragon**.
              
              Once our build pipeline was setup during the Vertical Slice Phase, we found locally building to Android was a little faster for testing mobile specific features instead of Unity Connect.
            
              When ready to build, I would merge our dev branch into main, build for the specific platforms in Unity Dashboard, and push the changes in internal testing in **App Store Connect** and **Google Play Console**.  
              `,
          },
          {
            type: "image",
            src: `${import.meta.env.BASE_URL}assets/BuildPipeline.png`,
            caption: "Drop Off Dragon's Build Pipeline",
          },
          ],
      },
      {
          title: "MassDiGI",
          blocks: [
          {
              type: "text",
              heading: "",
              body: "**I am so grateful** to have been given the opportunity for **MassDiGI SIP' 26**. Here are some **pictures** and our **blog post**!",
          },
          {
            type: "image",
            src: `${import.meta.env.BASE_URL}assets/TeamPicture.jpg`,
            caption: `"Badgers of Bikes" Team Picture for Drop Off Dragon`,
          }, 
          {
            type: "image",
            src: `${import.meta.env.BASE_URL}assets/SIP26.jpg`,
            caption: `MassDiGI SIP' 26`,
          }, 
          {
              type: "text",
              heading: "Blog Post",
              body: "",
          },
          {
              type: "imageLink",
              src: `${import.meta.env.BASE_URL}assets/MassDiGIBadge.png`,
              href: "https://massdigi.org/news/game-launch-drop-off-dragon-7-28-26/",
              caption: "",
              compact: true,
          },
          ],
      },
      ],

      tags: [
      { id: 1, name: "IOS", color: "bg-blue-600/30 text-blue-200 border-blue-500/30" },
      { id: 2, name: "Google Play", color: "bg-green-600/30 text-green-200 border-green-500/30" },
      { id: 3, name: "PlasticSCM", color: "bg-red-600/30 text-red-200 border-red-500/30" },
      { id: 4, name: "Miro",  color: "bg-lime-600/30 text-lime-200 border-lime-500/30" },
      { id: 5, name: "C#", color: "bg-orange-600/30 text-orange-200 border-orange-500/30" },
      { id: 6, name: "Unity", color: "bg-gray-600/30 text-gray-200 border-gray-500/30" },
      { id: 7, name: "Mobile",  color: "bg-grey-600/30 text-grey-200 border-grey-500/30" },
      ],
  },

  // Fobia Fights
  {
    id: 2,
    slug: "fobia-fights",
    title: "Fobia Fights",
    titleColor: "#90092D",
 
    // Descriptions
    description: "Solo developed an Online Multiplayer PvP game. 2024-2026",
    subDescription: [],
 
    // Links
    href: "",
    github: "",
    liveDemo: "",

    image: `${import.meta.env.BASE_URL}assets/FobiaFights.png`,
    hoverImage: [
      `${import.meta.env.BASE_URL}assets/FobiaFightsScreenshot1.png`,
      `${import.meta.env.BASE_URL}assets/FobiaFightsScreenshot2.png`,
      `${import.meta.env.BASE_URL}assets/FobiaFightsScreenshot3.png`,
    ],

    // YouTube link for trailer
    youtubeUrl: "https://youtu.be/w5foFyxMQHI",
 
    // ProjectDetails — header
    overview: `
    Fobia Fights is an **online multiplayer** PvP game, released on **Steam**, and available for Windows which accumulated **300+ Wishlists**!.

    I developed functionality for customizing your character, outfit, and knife to your liking, and then enter the fight against your friends! At the start of my **senior year of high school**, I decided to make a game that would allow me to **grow** as a designer and engineer.

    I wanted to experiment with a unique **combat system** that combined the chaotic nature of **Mario Kart power-ups** with a skill-based 2D top-down brawler. Throughout multiple iterations, I was able to create a combat system that was both fun and engaging, while also being easy to learn and hard to master.

    I experimented with different character, outfit, and knife abilities that each added a new layer to the **combat system** and allowed for a variety of playstyles. Through a series of **internal playtests**, I was able to **tune** and **balance** gameplay mechanics.

    I made sure to implement features that made players want to come back, such as a progression and prestige system, prestige loadouts, and **Steam achievements**.

    Since I was developing this game **solo**, I made sure to stay organized and **write down** my ideas and **design pillars** so that I could make decisions that aligned with my vision for the game.
    `,
 
    // ProjectDetails — details grid
    details: {
      role: "Solo Developer",
      type: "Online Multiplayer PvP",
      platform: "Steam",
      language: "C#",
      software: ["Unity", "Photon", "Aseprite", "FL Studio", "Audactiy", "DaVinci Resolve", ],
      duration: "20 months, Dec 2024 - Aug 2026",
    },

    // Shown right under the About section, before the custom sections below
    imageLink: {
      src: `${import.meta.env.BASE_URL}assets/SteamBadge.png`,
      href: "https://store.steampowered.com/app/3438550/Fobia_Fights/",
      caption: "",
      compact: true, // shrinks it to a centered, button-sized card instead of full width
    },

    sections: [
      {
        title: "Combat & Loadout System",
        blocks: [
          {
            type: "text",
            body: "When designing the loadout system, I wanted to make \"Classes\" that suited different **playstyles** (Tank, Troll, or Tracker) but adapted for Fobia Fights:",
          },
          {
            type: "list",
            rows: [
              {
                heading: "Jeri (Glass Cannon)",
                bullets: [
                  "Taking inspiration from the \"Cactus\" class in **Plants vs Zombies: Garden Warfare**. Jeri can morph into a fast drone-like spider that can deal a lot of damage but is very fragile.",
                  "When designing Jeri, I wanted players to fall in love with the character through **Jeri's** monstrous design similar to **Webber** from **Don't Starve Together**.",
                ],
              },
              {
                heading: "Skulk (Duelist)",
                bullets: [
                  "Taking inspiration from **Sekiro: Shadows Die Twice**, Skulk makes **parrying** even more important. Through smaller parry windows and causing bleed on successful parries, Skulk acts as a high-skill ceiling character that rewards players for learning the timing of their attacks.",
                ],
              },
              {
                heading: "Etty (Dasher)",
                bullets: [
                  "Being the fastest character in the game, Etty acts as a fun **hit-and-run** style character that can dash through other players.",
                  "Etty stands out for being a non-binary character that is designed to be a fun and approachable character for players of all genders and skills.",
                ],
              },
            ],
          },
          {
            type: "video",
            src: `${import.meta.env.BASE_URL}assets/JeriGIF.gif`,
            caption: "Jeri morph ability showcase",
          }
        ],
      },
      {
        title: "Phobia System",
        blocks: [
          {
            type: "text",
            heading: "",
            body: `I wanted to replicate the chaotic nature of **Mario Kart power-ups** that can be used during **combat**.
                
            I designed each phobia to have a unique effect that can be used during **different situations.**

            **For example: **
            
            • **Chronomentrophobia (Fear of Clocks)** is a phobia that is used to get away from players that are chasing you by rewinding you 6 seconds similar to Tracer from Overwatch's Recall ability.

            • **Trypanophobia (Fear of Needles)** covers the user in needles that deal thorns damage to players that attack them acting as a counter to faster melee characters.

            (See the screenshots below for more phobia examples)
            `,
          },
          {
            type: "images", // grid of multiple images at once
            items: [
              { src: `${import.meta.env.BASE_URL}assets/FobiaFightsScreenshot4.jpg`, caption: "Fear of Bombs" },
              { src: `${import.meta.env.BASE_URL}assets/FobiaFightsScreenshot2.png`, caption: "Fear of Tight Spaces" },
              { src: `${import.meta.env.BASE_URL}assets/FobiaFightsScreenshot3.png`, caption: "Fear of Spiders" },
            ],
          },
        ],
      },
      {
        title: "Photon Networking",
        blocks: [
          {
            type: "text",
            heading: "",
            body: `A popular networking solution for Unity is **Photon PUN 2**, which I used to implement the **online multiplayer** functionality in Fobia Fights.
            
            I implemented a lobby system that allowed players to create and join private or public rooms. I also implemented a matchmaking system that allowed players to find matches based on their region.

            Using **Photon**, it slowed development down a bit, so in the future I would like to use a more robust networking solution like **Unity Netcode for GameObjects with Steam integration** to achieve a similar result.

            This project was a **great** opportunity for me to learn about **networking** and **Steam integration** and, more importantly, **grow in my skills with C# to a more advanced level**.
            
            Some example code for the creation and joining of rooms:`,
          },
          {
            type: "code",
            heading: "Create / Join Room",
            language: "csharp",
            code: `public void JoinRoom()
{
    // Returns nulls if the selected loadout is not fully unlocked
    CheckIfLoadoutIsValid(); 
    
    // Declare room options
    RoomOptions roomOptions;
    
    // Set room options
    if (gameSettings.isPrivateGame)
    {
        // For private games, generate a new room name only if we're not joining an existing one
        if (string.IsNullOrEmpty(roomNameToJoin))
        {
            // Generate a new lobby code until we find a valid one
            do
            {
                code = gameSettings.GenerateLobbyCode();
            } while (!gameSettings.IsValidLobbyCode(code));
            roomNameToJoin = code;
            Debug.Log("Creating new private room: " + roomNameToJoin);
        }
        else
        {
            Debug.Log("Joining existing private room: " + roomNameToJoin);
        }

        // Set name to lobby code for private games
        gameSettings.roomName = roomNameToJoin;
        
        // Generates room properties and sets the room options for a private game
        GenerateRoomProperties(true); // true for private game
    }
    else  
    {
        // For public games, use "?" to let Photon assign a random room
        if (Steamworks.SteamClient.IsValid)
        {
            roomNameToJoin = SteamManager.Instance.PlayerSteamName + "'s " + RandomAdjective() + " Room: ";
        } else
            roomNameToJoin = "?"; // Failsafe
        
        // Set name to lobby code for public games
        gameSettings.roomName = roomNameToJoin;
        Debug.Log("Joining public room");
        
        // Generates room properties and sets the room options for a public game
        GenerateRoomProperties(false); // false for public game
    }

    // Join or create the room with the specified name and options
    PhotonNetwork.JoinOrCreateRoom(roomNameToJoin, roomOptions, null);

    // UI cleanup
    nameUI.SetActive(false);
    connectingUI.SetActive(true);
}`,
          },
        ],
      },
      {
        title: "What I Learned",
        blocks: [
          {
            type: "text",
            heading: "",
            body: `Through solo development of Fobia Fights, I learned a lot about the importance of **planning** and **organization**.
            
            I learned that it is important to have a clear vision for the game and to stick to it. I also learned that it is important to be flexible and to be willing to **change things if they are not working**. **Do not get too attached to your ideas in case they do not work for the game and benefit for the player**.
            
            Development wasn't always perfect as I had to solo develop the game; I learned so much about **shipping a game independently** and learning **how to make a game the right way** for future projects. Having started this project in **high school**, **my skills in C# programming and Unity have grown immensely** and I am now able to take on more **complex projects with my new skills**.
            
            I am so **grateful** for the opportunity to have worked on this project and wanted to share some **pictures** of the showcase of the game and **reactions** from players!`,
          },
          {
            type: "text",
            heading: "Showcase",
            body: "",
          },
          {
            type: "image",
            src: `${import.meta.env.BASE_URL}assets/FobiaFightsShowcase.jpg`,
            caption: "Me presenting Fobia Fights at Berklee College of Music's Senior Project Showcase with Dominik Bauer (Quasimixture) who made the music.",
          },
          {
            type: "video",
            src: `${import.meta.env.BASE_URL}assets/FobiaFightsShowcaseVideo.mp4`,
            caption: "These two players kept coming back in line to play Fobia Fights at the showcase and were having a blast!",
          },
          {
            type: "image",
            src: `${import.meta.env.BASE_URL}assets/FobiaFightsShowcase2.png`,
            caption: "Northeastern End of Semester Showcase where I presented Fobia Fights and got to show it off to other students.",
          },
        ],
      },
    ],
 
    // Tags shown on card and in Technologies section
    tags: [
        { id: 1, name: "Steam", color: "bg-blue-600/30 text-blue-200 border-blue-500/30" },
        { id: 2, name: "Photon", color: "bg-teal-600/30 text-teal-200 border-teal-500/30" },
        { id: 3, name: "Git", color: "bg-red-600/30 text-red-200 border-red-500/30" },
        { id: 4, name: "Trello",  color: "bg-lime-600/30 text-lime-200 border-lime-500/30" },
        { id: 5, name: "C#", color: "bg-orange-600/30 text-orange-200 border-orange-500/30" },
        { id: 6, name: "Unity",  color: "bg-gray-600/30 text-gray-200 border-gray-500/30" },
        { id: 7, name: "PC",  color: "bg-black-600/30 text-black-200 border-black-500/30" },
    ],
  },

  // Popup://Tower
  {
    id: 3,
    slug: "popup-tower",
    title: "POPUP://TOWER",
    titleColor: "#F2F2F2", // color of the bolded, centered project name on the details page
 
    // Descriptions
    description: "Co-developed the 29th Most Popular Game of GMTK 2026 Game Jam",
    subDescription: [],
 
    // Links
    href: "",
    github: "",
    liveDemo: "",
 
    // Media Pictures lol with hovering images that get cycled
    image: `${import.meta.env.BASE_URL}assets/PopupTower.png`,
    hoverImage: [
      `${import.meta.env.BASE_URL}assets/PopupTowerScreenshot1.png`,
      `${import.meta.env.BASE_URL}assets/PopupTowerScreenshot2.png`,
      `${import.meta.env.BASE_URL}assets/PopupTowerScreenshot3.png`,
    ],

    // YouTube link for trailer
    youtubeUrl: "",
    mp4: `${import.meta.env.BASE_URL}assets/PopupTowerGameplay.mp4`,
 
    // ProjectDetails — header
    overview:
      `Climb a number tower and beat minigames as the tower incrementally counts down. **Made for GMTK Game Jam 2026**!
      
      We took inspiration from **Frutiger Aero** visuals and combined with micro-games similar to childhood browser and DS games like **Pictochat**, **The Impossible Quiz**, and **The Password Game**.
      
      Our team joined **GMTK 2026** two days after it started because we were busy working on **Drop Off Dragon**. We designed an idea which led to **POPUP://TOWER**!
      `,
 
    imageLink: {
    src: `${import.meta.env.BASE_URL}assets/ItchBadge.svg`,
    href: "https://faketown.itch.io/popuptower",
    caption: "",
    compact: true,
    },

    sections: [
    {
        title: "My Work",
        blocks: [
        {
            type: "text",
            body: `As **Lead Techincal Game Designer**, I helped envision the idea of going up and down a tower for the theme **"Countdown."** I spent a lot of time collaborating with **Zoe Yang (Lead Artist)** to come up with a clear vision for the game. We came up with **Frutiger Aero but with Popups**! I was also in charge of directing the team on what to work on and approving design decisions.

            Working with the other programmers, we used certain equations to get the scaling of the game in a spot we were happy with for the jam. If we had extra time, I would have loved to spend more time with **James Prendergast** and **Max Allen (the programmers)** on tuning the values of the difficulty scaling. In its current state, the game is moderately difficult.

            **Overall**, the experience was **great** and **refined** my **technical design skills** working on a **smaller scale project** after **Drop Off Dragon**!
            
            **CREDITS**
            Zoe Yang - Lead Artist
            Jake DeRoma - Lead Technical Game Designer, Programmer
            Rose Briggs - Lead Programmer
            James 'Bird' Prendergast - Lead Sound Designer, Programmer, Math Nerd
            Max Allen - Programmer, Balance Game Designer
            Bashar Alqassar - Programmer
            `,
        },
        ],
    },
    {
        title: "Results",
        blocks: [
        {
            type: "image",
            src: `${import.meta.env.BASE_URL}assets/PopupTowerRatings.png`,
            caption: ``,
        }, 
        {
            type: "image",
            src: `${import.meta.env.BASE_URL}assets/PopupTowerAnalytics.png`,
            caption: `Itch.io Analytics`,
        }, 
        {
            type: "text",
            body: "",
        },
        ],
    },
    ],

    // ProjectDetails — details grid
    details: {
      role: "Lead Technical Game Designer, Programmer",
      type: "Incremental, Micro-games",
      platform: "WebGL, Windows, Linux, Mac",
      language: "C#",
      software: ["Unity", "Itch.io", "Desmos", "VS Code"],
      duration: "2 days (GMTK 2026 Game Jam)",
    },
 
    // Tags shown on card and in Technologies section
    tags: [
        { id: 1, name: "GMTK 2026", color: "bg-cyan-600/30 text-cyan-200 border-cyan-500/30" },
        { id: 2, name: "27th Most Popular", color: "bg-yellow-600/30 text-yellow-200 border-yellow-500/30" },
        { id: 3, name: "Git", color: "bg-red-600/30 text-red-200 border-red-500/30" },
        { id: 4, name: "C#", color: "bg-orange-600/30 text-orange-200 border-orange-500/30" },
        { id: 5, name: "Unity",  color: "bg-gray-600/30 text-gray-200 border-gray-500/30" },
        { id: 6, name: "PC",  color: "bg-black-600/30 text-black-200 border-black-500/30" },
    ],
  },
];

// Footer icons
export const mySocials = [
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/jakederoma/",
    icon: `${import.meta.env.BASE_URL}assets/socials/linkedIn.svg`,
  },
  {
    name: "Git",
    href: "https://github.com/Jaker333",
    icon: `${import.meta.env.BASE_URL}assets/logos/github.svg`,
  },
  {
    name: "Email",
    href: "mailto:jakerdevs@gmail.com",
    icon: `${import.meta.env.BASE_URL}assets/logos/mail.svg`,
  },
];