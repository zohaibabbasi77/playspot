{{-- <header class="header-area"> --}}
    <nav class="sidebar locked close hoverable">
        <div id="side-logo" class="logo_items flex">
          <span class="nav_image">
            <img src="{{ asset('public/assets/images/custom/home_icon.png') }}" alt="logo" style="border-radius: 0;">
          </span>
          <span class="logo_name" style="font-size: 16px !important;">Home</span>
          <i class="bx bx-lock-open-alt" id="lock-icon" title="Unlock Sidebar"></i>
          <i class="bx bx-x" id="sidebar-close"></i>
        </div>
  
        <div class="menu_container">
          <div class="menu_items">
            <ul class="menu_item">
              <!-- <div class="menu_title flex">
                <span class="title">Dashboard</span>
                <span class="line"></span>
              </div> -->
              <li class="item">
                <a href="#" class="link flex">
                  <i class="bx bx-home-alt"></i>
                  <span>Overview</span>
                </a>
              </li>
              <li class="item">
                <a href="#" class="link flex">
                  <i class="bx bx-grid-alt"></i>
                  <span>All Projects</span>
                </a>
              </li>
            </ul>
  
            <ul class="menu_item">
              <!-- <div class="menu_title flex">
                <span class="title">Editor</span>
                <span class="line"></span>
              </div> -->
              <li class="item">
                <a href="#" class="link flex">
                  <i class="bx bxs-magic-wand"></i>
                  <span>Magic Build</span>
                </a>
              </li>
              <li class="item">
                <a href="#" class="link flex">
                  <i class="bx bx-folder"></i>
                  <span>New Projects</span>
                </a>
              </li>
              <li class="item">
                <a href="#" class="link flex">
                  <i class="bx bx-cloud-upload"></i>
                  <span>Upload New</span>
                </a>
              </li>
            </ul>
  
            <ul class="menu_item">
              <!-- <div class="menu_title flex">
                <span class="title">Setting</span>
                <span class="line"></span>
              </div> -->
              <li class="item">
                <a href="#" class="link flex">
                  <i class="bx bx-flag"></i>
                  <span>Notice Board</span>
                </a>
              </li>
              <li class="item">
                <a href="#" class="link flex">
                  <i class="bx bx-award"></i>
                  <span>Award</span>
                </a>
              </li>
              <li class="item">
                <a href="#" class="link flex">
                  <i class="bx bx-cog"></i>
                  <span>Setting</span>
                </a>
              </li>
            </ul>
          </div>
  
          <div class="sidebar_profile flex">
            <span class="nav_image">
              <img src="{{ asset('public/assets/images/custom/profile.jpg') }}" alt="profile">
            </span>
            <div class="data_text">
              <span class="name">David Oliva</span>
              <span class="email">david@gmail.com</span>
            </div>
          </div>
        </div>
      </nav>
  
      <!-- Navbar -->
      <nav class="navbar flex fsadfaf">
        <div class="logo_items flex">
          <span class="nav_image">
            <img src="{{ asset('public/assets/images/custom/playspot.png') }}" alt="logo_img">
          </span>
          <span class="logo_name" id="LogoName">CrazyGames</span>
          <!-- <i class="bx bx-lock-alt" id="lock-icon" title="Unlock Sidebar"></i>
          <i class="bx bx-x" id="sidebar-close"></i> -->
        </div>
        <i class="bx bx-menu" id="sidebar-open"></i>
        <div class="search-container">
          <input type="text" placeholder="Search..." class="search_box" />
          <i class="fa fa-search search-icon" aria-hidden="true"></i>
        </div>
        <span class="nav_image">
            <img src="{{ asset('public/assets/images/custom/profile.jpg') }}" alt="profile">
            <button class="login-btn">Log in</button>
        </span>
      </nav>
{{-- </header> --}}