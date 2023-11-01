<script setup>
defineProps({
  user: {
    type: Object,
    default: () => {}
  }
});
function checkIfAdmin(email) {
  if (email === 'alshammat51@gmail.com') {
    return true;
  } else {
    return false;
  }
}
</script>

<template>
  <header>
    <!-- Sidebar Start -->
    <nav id="sidebarMenu" class="d-lg-block sidebar bg-white backgroundItems">
      <div class="position-sticky">
        <div class="list-group list-group-flush" style="padding-top: 7px">
          <router-link
            to="/"
            class="list-group-item list-group-item-action py-2 ripple backgroundItems"
          >
            Home
          </router-link>
          <router-link
            :to="{ name: 'ApiSearch' }"
            class="list-group-item list-group-item-action py-2 ripple backgroundItems"
          >
            All Genes HPO
          </router-link>
          <router-link
            :to="{ name: 'GeneInfo' }"
            class="list-group-item list-group-item-action py-2 ripple backgroundItems"
          >
            Genes Definitions
          </router-link>
          <router-link
            data-test="login-link"
            :to="{ name: 'Login' }"
            v-if="!user"
            class="list-group-item list-group-item-action py-2 ripple backgroundItems"
          >
            Login
          </router-link>
          <router-link
            data-test="register-link"
            :to="{ name: 'Register' }"
            v-if="!user"
            class="list-group-item list-group-item-action py-2 ripple backgroundItems"
          >
            Register
          </router-link>
          <router-link
            :to="{ name: 'Analysis' }"
            class="list-group-item list-group-item-action py-2 ripple backgroundItems"
          >
            Choose Analysis
          </router-link>
          <router-link
            :to="{ name: 'Query' }"
            v-if="user"
            class="list-group-item list-group-item-action py-2 ripple backgroundItems"
          >
            Your Query
          </router-link>
          <router-link
            :to="{ name: 'ManageAccount' }"
            v-if="user"
            class="list-group-item list-group-item-action py-2 ripple backgroundItems"
          >
            Manage Account
          </router-link>
          <router-link
            :to="{ name: 'UserPage' }"
            v-if="user"
            class="list-group-item list-group-item-action py-2 ripple backgroundItems"
          >
            User Data
          </router-link>
          <router-link
            :to="{ name: 'AddData' }"
            v-if="user"
            class="list-group-item list-group-item-action py-2 ripple backgroundItems"
          >
            Add Data
          </router-link>
          <router-link
            :to="{ name: 'DeleteAccount' }"
            v-if="user"
            class="list-group-item list-group-item-action py-2 ripple backgroundItems"
          >
            Delete Account
          </router-link>
          <button
            class="list-group-item list-group-item-action py-2 ripple backgroundItems"
            v-if="user"
            @click="$emit('logout')"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
    <!-- Sidebar End -->

    <!-- Navbar Start -->
    <nav
      id="main-navbar"
      class="navbar navbar-expand-lg navbar-light bg-white fixed-top backgroundItems"
    >
      <div class="container-fluid">
        <!-- Logo and Title -->
        <router-link to="/">
          <img
            class="titleLogo"
            src="@/components/imgs/HeartRythm.png"
            height="50"
            alt="Heart Rythms"
            loading="lazy"
          />
          <h1 class="titleLogo" style="color: black">Cardiomyopathy Analysis</h1>
        </router-link>

        <!-- Search -->
        <!-- <ul class="navbar-nav ms-auto d-flex flex-row">
          <form class="d-none d-md-flex input-group w-auto my-auto">
            <input
              autocomplete="off"
              type="search"
              class="form-control rounded"
              placeholder="Search"
              style="min-width: 225px"
              v-model="searchData"
            />
            <span class="input-group-text border-0"><i class="fas fa-search"></i></span>
          </form>
        </ul> -->
      </div>
    </nav>
    <!-- Navbar End -->
  </header>
</template>

<style>
/* Sidebar Start */
.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  padding: 58px 0 0;

  width: 170px;
  z-index: 600;
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto;
}

/* Sidebar End */

/* Navbar Start */
.titleLogo {
  display: inline-block;
  vertical-align: middle;
}
/* Navbar End */
</style>
