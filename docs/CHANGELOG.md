## [1.2.3](https://github.com/akhenda/WAPI/compare/v1.2.2...v1.2.3) (2018-08-26)


### Bug Fixes

* **listing:** split phone string on different separators ([152246c](https://github.com/akhenda/WAPI/commit/152246c))

## [1.2.2](https://github.com/akhenda/WAPI/compare/v1.2.1...v1.2.2) (2018-08-26)


### Bug Fixes

* **geolocation:** fix location update bug ([61a6989](https://github.com/akhenda/WAPI/commit/61a6989))

## [1.2.1](https://github.com/akhenda/WAPI/compare/v1.2.0...v1.2.1) (2018-08-10)


### Bug Fixes

* **build:** iOS build failing in CI ([4d65d76](https://github.com/akhenda/WAPI/commit/4d65d76))

# [1.2.0](https://github.com/akhenda/WAPI/compare/v1.1.0...v1.2.0) (2018-08-09)


### Bug Fixes

* **home:** make all category titles bolder and same size as volunteering ([2cdb063](https://github.com/akhenda/WAPI/commit/2cdb063))
* **listing:** phone call for multiple numbers on a listing ([093d13c](https://github.com/akhenda/WAPI/commit/093d13c))
* **listings:** listings items drop shadow ([a7ded56](https://github.com/akhenda/WAPI/commit/a7ded56))
* **navigation:** sign out menu position ([38ff6a9](https://github.com/akhenda/WAPI/commit/38ff6a9))


### Features

* change icon colors on drawer menu and survey screen ([223d426](https://github.com/akhenda/WAPI/commit/223d426))
* **listing:** handle listings with no coordinates and handle navigation ([fa8d52b](https://github.com/akhenda/WAPI/commit/fa8d52b))
* **loading:** change loading background to white and use official logo ([a318c74](https://github.com/akhenda/WAPI/commit/a318c74))
* **share:** enable users to share listings ([5116a28](https://github.com/akhenda/WAPI/commit/5116a28))

# [1.1.0](https://github.com/akhenda/WAPI/compare/v1.0.0...v1.1.0) (2018-08-06)


### Bug Fixes

* **build:** correctly link the exception handler and update iOS icons ([052b2ab](https://github.com/akhenda/WAPI/commit/052b2ab))
* **build:** downgrade RN to 0.55.4 and remove rogue console.log ([e4fa2a1](https://github.com/akhenda/WAPI/commit/e4fa2a1))
* **build:** fix failing android build ([257bb2c](https://github.com/akhenda/WAPI/commit/257bb2c))
* **navigation:** correctly handle unauthenticated user ([94fc480](https://github.com/akhenda/WAPI/commit/94fc480))
* **redux:** wrong state mutation on FETCH_USER_FAILURE ([03e8b2d](https://github.com/akhenda/WAPI/commit/03e8b2d))


### Features

* **auth:** add on press handler for the forgot password link ([0a936c9](https://github.com/akhenda/WAPI/commit/0a936c9))


### Performance Improvements

* **images:** start using react-native-fast-image for images ([3ccb05b](https://github.com/akhenda/WAPI/commit/3ccb05b))

# [1.0.0](https://github.com/akhenda/WAPI/compare/v0.6.3...v1.0.0) (2018-08-02)


### Bug Fixes

* **build:** add semantic release to the dev dependencies ([ccb7ad9](https://github.com/akhenda/WAPI/commit/ccb7ad9))
* **build:** fix code to conform with latest eslint rules ([78f6f97](https://github.com/akhenda/WAPI/commit/78f6f97))
* **build:** iOS build after RN upgrade ([2942750](https://github.com/akhenda/WAPI/commit/2942750))
* **build:** update semantic release configs to work with new updates ([a26ae96](https://github.com/akhenda/WAPI/commit/a26ae96))
* **tests:** downgrade babel-preset-react-native to fix tests ([ed84685](https://github.com/akhenda/WAPI/commit/ed84685))


### chore

* **build:** update all npm packages except detox ([09c5633](https://github.com/akhenda/WAPI/commit/09c5633))


### Code Refactoring

* **build:** upgrade React Native to v0.56.0 ([8651379](https://github.com/akhenda/WAPI/commit/8651379))


### Features

* **navigation:** rewrite app routing configuration 🔥 ([486a4d2](https://github.com/akhenda/WAPI/commit/486a4d2))
* **profile:** finish edit profile screen ([27f6ebf](https://github.com/akhenda/WAPI/commit/27f6ebf))


### Performance Improvements

* **android:** enable large memory heap for android ([118b17a](https://github.com/akhenda/WAPI/commit/118b17a))


### BREAKING CHANGES

* **build:** upgrade redux to v4 and also upgrade semantic-release plugins which will break the
CI processes
* **build:** upgrade from RN v0.51.0 to v0.56.0 and start using CocoaPods for iOS

## [0.6.3](https://github.com/akhenda/WAPI/compare/v0.6.2...v0.6.3) (2018-07-08)


### Bug Fixes

* **home:** home screen rerender bugs & listing website link bug ([11552d4](https://github.com/akhenda/WAPI/commit/11552d4))

## [0.6.2](https://github.com/akhenda/WAPI/compare/v0.6.1...v0.6.2) (2018-07-06)


### Bug Fixes

* **listing:** googleStaticMap prop types ([7efc8be](https://github.com/akhenda/WAPI/commit/7efc8be))

## [0.6.1](https://github.com/akhenda/WAPI/compare/v0.6.0...v0.6.1) (2018-07-06)


### Bug Fixes

* **build:** android force closes on start ([277d069](https://github.com/akhenda/WAPI/commit/277d069))
* **navigation:** blank drawer bug ([5678757](https://github.com/akhenda/WAPI/commit/5678757))
* **profile:** prevent fetching listings if user has no favourites ([9fdf405](https://github.com/akhenda/WAPI/commit/9fdf405))

# [0.6.0](https://github.com/akhenda/WAPI/compare/v0.5.0...v0.6.0) (2018-07-05)


### Features

* **profile:** finish 'my listings' section on the profile screen ([aceff44](https://github.com/akhenda/WAPI/commit/aceff44))
* **profile:** make listings on profile screen clickable ([4158a9d](https://github.com/akhenda/WAPI/commit/4158a9d))
* create the edit profile screen and install RNRestart (wip) ([0efae8c](https://github.com/akhenda/WAPI/commit/0efae8c))

# [0.5.0](https://github.com/akhenda/WAPI/compare/v0.4.0...v0.5.0) (2018-06-12)


### Bug Fixes

* **android:** geolocation fix for android ([cd62656](https://github.com/akhenda/WAPI/commit/cd62656))
* **home:** reduce number of rerenders on the HomeScreen ([0bd2165](https://github.com/akhenda/WAPI/commit/0bd2165))


### Features

* **listing:** make contact details clickable ([a86ebfa](https://github.com/akhenda/WAPI/commit/a86ebfa))

<a name="0.4.0"></a>
# [0.4.0](https://github.com/akhenda/WAPI/compare/v0.3.1...v0.4.0) (2018-05-24)


### Bug Fixes

* **home:** native base buttons and cacheable images props ([79207a1](https://github.com/akhenda/WAPI/commit/79207a1))
* **listing:** hide unwanted button icons ([f71eb16](https://github.com/akhenda/WAPI/commit/f71eb16))


### Features

* **listing:** add image slider for gallery images ([8563c05](https://github.com/akhenda/WAPI/commit/8563c05))
* **listing:** fold long description text ([6c814e5](https://github.com/akhenda/WAPI/commit/6c814e5))


### Performance Improvements

* **android:** use a spinner for date picker on the survey page ([15fb43f](https://github.com/akhenda/WAPI/commit/15fb43f))
* **build:** relink the native dependencies ([f14f919](https://github.com/akhenda/WAPI/commit/f14f919))
* **build:** upgrade dependencies ([b2a4800](https://github.com/akhenda/WAPI/commit/b2a4800))

<a name="0.3.1"></a>
## [0.3.1](https://github.com/akhenda/WAPI/compare/v0.3.0...v0.3.1) (2018-05-02)


### Bug Fixes

* **build:** react-native-sentry causes iOS archive build to fail ([498fde9](https://github.com/akhenda/WAPI/commit/498fde9))

<a name="0.3.0"></a>
# [0.3.0](https://github.com/akhenda/WAPI/compare/v0.2.3...v0.3.0) (2018-04-30)


### Bug Fixes

* **auth:** show apprpriate error messages ([b1c2ece](https://github.com/akhenda/WAPI/commit/b1c2ece))
* **build:** iOS assets errors when validating archive ([739a91c](https://github.com/akhenda/WAPI/commit/739a91c))


### Features

* **build:** install and configure react native sentry ([dcc9cdc](https://github.com/akhenda/WAPI/commit/dcc9cdc))
* **build:** install react native exception handler ([b71f096](https://github.com/akhenda/WAPI/commit/b71f096))

<a name="0.2.3"></a>
## [0.2.3](https://github.com/akhenda/WAPI/compare/v0.2.2...v0.2.3) (2018-04-24)


### Bug Fixes

* **build:** android build failing due to wrong radar android support lib ([567e177](https://github.com/akhenda/WAPI/commit/567e177))
* **build:** regenerate react-native-radar patch file ([5870a7d](https://github.com/akhenda/WAPI/commit/5870a7d))
* **search:** app crashes when searching for a listing ([21f29b0](https://github.com/akhenda/WAPI/commit/21f29b0))

<a name="0.2.2"></a>
## [0.2.2](https://github.com/akhenda/WAPI/compare/v0.2.1...v0.2.2) (2018-01-22)


### Bug Fixes

* **build:** change some theme files casing ([19170cb](https://github.com/akhenda/WAPI/commit/19170cb))

<a name="0.2.1"></a>
## [0.2.1](https://github.com/akhenda/WAPI/compare/v0.2.0...v0.2.1) (2018-01-22)


### Bug Fixes

* **build:** theme imports ([3a0fa28](https://github.com/akhenda/WAPI/commit/3a0fa28))

<a name="0.2.0"></a>
# [0.2.0](https://github.com/akhenda/WAPI/compare/v0.1.1...v0.2.0) (2018-01-22)


### Bug Fixes

* **offline:** exit app when retry button is clicked ([9120838](https://github.com/akhenda/WAPI/commit/9120838))
* patch react-native-offline-mode ([57ecb20](https://github.com/akhenda/WAPI/commit/57ecb20))
* **auth:** update auth check logic ([6ee7e23](https://github.com/akhenda/WAPI/commit/6ee7e23))
* **build:** failing android build ([cf71c4f](https://github.com/akhenda/WAPI/commit/cf71c4f))
* **build:** remove background geolocation patch ([144864e](https://github.com/akhenda/WAPI/commit/144864e))
* **geolocation:** remove mauron's geolocation library and use radar.io ([4c68d99](https://github.com/akhenda/WAPI/commit/4c68d99))
* **home:** bug which caused home page to rerender every time ([29c65a1](https://github.com/akhenda/WAPI/commit/29c65a1))
* **home:** clear places saved in listings state when on homepage ([2507667](https://github.com/akhenda/WAPI/commit/2507667))
* **navigation:** drawer bug when user data does not exist ([27d05b9](https://github.com/akhenda/WAPI/commit/27d05b9))
* **patches:** failing android build ([db953aa](https://github.com/akhenda/WAPI/commit/db953aa))
* **patches:** update proptypes and netinfo ([307c91e](https://github.com/akhenda/WAPI/commit/307c91e))
* **utils:** return false in openStatus when no openingTimes are passed ([3d0b056](https://github.com/akhenda/WAPI/commit/3d0b056))


### Features

* create app theme ([58391a3](https://github.com/akhenda/WAPI/commit/58391a3))
* create network problem page ([b54be64](https://github.com/akhenda/WAPI/commit/b54be64))
* **auth:** create sign up survey page ([6530ed8](https://github.com/akhenda/WAPI/commit/6530ed8))
* **auth:** implement authentication flow ([11cb7d7](https://github.com/akhenda/WAPI/commit/11cb7d7))
* **home:** create the homepage ([87f7c11](https://github.com/akhenda/WAPI/commit/87f7c11))
* **intro:** create initial app intro page ([8503cde](https://github.com/akhenda/WAPI/commit/8503cde))
* **intro:** wire up the app intro ([d3b3c30](https://github.com/akhenda/WAPI/commit/d3b3c30))
* **intro:** wire up the survey page ([3317f51](https://github.com/akhenda/WAPI/commit/3317f51))
* **listing:** create listing details page ([ab58b5a](https://github.com/akhenda/WAPI/commit/ab58b5a))
* **listing:** wire up the listing details page ([1843278](https://github.com/akhenda/WAPI/commit/1843278))
* **listings:** create general listing and restaurant listing pages ([53cc573](https://github.com/akhenda/WAPI/commit/53cc573))
* **listings:** implement search and sign out functionality ([5aba89b](https://github.com/akhenda/WAPI/commit/5aba89b))
* **listings:** wire up fetching remote categories ([d7d06c7](https://github.com/akhenda/WAPI/commit/d7d06c7))
* **listings:** wire up listings ([4e7c847](https://github.com/akhenda/WAPI/commit/4e7c847))
* **navigation:** create drawer menu ([51b7236](https://github.com/akhenda/WAPI/commit/51b7236))
* **profile:** create profile page ([e430d38](https://github.com/akhenda/WAPI/commit/e430d38))
* **profile:** wire up profile page ([f50a232](https://github.com/akhenda/WAPI/commit/f50a232))

<a name="0.1.1"></a>
## [0.1.1](https://github.com/akhenda/WAPI/compare/v0.1.0...v0.1.1) (2018-01-10)


### Bug Fixes

* **build:** fix calculation of versionCode from git commits ([eaa1c23](https://github.com/akhenda/WAPI/commit/eaa1c23))
* **build:** update versionCode in build.gradle ([f3a4268](https://github.com/akhenda/WAPI/commit/f3a4268))

<a name="0.1.0"></a>
# [0.1.0](https://github.com/akhenda/WAPI/compare/v0.0.1...v0.1.0) (2018-01-09)


### Bug Fixes

* **build:** add missing iOS assets and fix the archive process ([8b4e91c](https://github.com/akhenda/WAPI/commit/8b4e91c))
* **build:** fix invalid gradle command ([bcdf0d7](https://github.com/akhenda/WAPI/commit/bcdf0d7))
* **build:** repatch detox ([0d6b201](https://github.com/akhenda/WAPI/commit/0d6b201))
* **build:** update release configs to work in CI ([a8b7145](https://github.com/akhenda/WAPI/commit/a8b7145))
* **tests:** setup patch-package and patch detox@6.0.4 ([9d8ca00](https://github.com/akhenda/WAPI/commit/9d8ca00))


### Features

* **dummy:** test semantic release ([9b4162d](https://github.com/akhenda/WAPI/commit/9b4162d))
