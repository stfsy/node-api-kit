# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.2.0](https://github.com/stfsy/node-api-kit/issues/compare/v0.1.0...v0.2.0) (2023-08-06)


### Features

* **access-log:** add tracing ([7d57235](https://github.com/stfsy/node-api-kit/issues/commit/7d572357a08f082e1cabbe158f6e9cd88505edf3))
* **access-log:** use log utility ([12edf8f](https://github.com/stfsy/node-api-kit/issues/commit/12edf8ffc8681d948796bcea22d1173fcf3d53a3))
* **body-parser:** add middleware with enabled tracing ([847acb6](https://github.com/stfsy/node-api-kit/issues/commit/847acb6d16b4bb6ed4c320ede08e98fce2621504))
* **cacheable:** add tracing ([fde7a4b](https://github.com/stfsy/node-api-kit/issues/commit/fde7a4b244bc3d42dba597b90c1992dd53ea97ee))
* **content-type:** add tracing ([ea46498](https://github.com/stfsy/node-api-kit/issues/commit/ea464986d61a8ca5e17cd0d742e98aad76a1be0f))
* **endpoints:** add tracing ([d2560d4](https://github.com/stfsy/node-api-kit/issues/commit/d2560d4373b200401a152eea8da828d336ca0f27))
* **resource-id:** add tracing ([87e2d48](https://github.com/stfsy/node-api-kit/issues/commit/87e2d482795a4712e06e21edae4a19c18e679e07))
* **security-headers:** add tracing ([196ba87](https://github.com/stfsy/node-api-kit/issues/commit/196ba87aece91b9c24b66c160047954333ab461c))
* **tracing:** add utility for tracing function calls ([9cd9f24](https://github.com/stfsy/node-api-kit/issues/commit/9cd9f2407936bbf704a3718f6016095c906941e1))


### Bug Fixes

* **resoruce-id:** create id returns promise ([6cd6779](https://github.com/stfsy/node-api-kit/issues/commit/6cd6779b3ae4fbc8966d157117ee771c9a39cb85))


### Refactorings

* **tracing:** move tracing scripts to tracing folder and add impls for aws ([69cb955](https://github.com/stfsy/node-api-kit/issues/commit/69cb955b094fbe3b591f4464e44bbfe333ed690d))


### Chores

* add additional types ([d2dd1dc](https://github.com/stfsy/node-api-kit/issues/commit/d2dd1dca54264da2351be5bf52b118c6fb3c4718))
* add example domain for books ([1cf7a90](https://github.com/stfsy/node-api-kit/issues/commit/1cf7a9023d03e70562928f10748cacc52e28c0d2))
* add factory method for endpoints ([3a98585](https://github.com/stfsy/node-api-kit/issues/commit/3a98585630e11affc5a71bb03701122352b2e87a))
* add generic resource service for examples ([dff2c86](https://github.com/stfsy/node-api-kit/issues/commit/dff2c862a92990e7c6550a4139eb480358afae66))
* add npm scripts for linting ([39b891b](https://github.com/stfsy/node-api-kit/issues/commit/39b891b384f5b27a6c7ad0e087fb0cc0715a40e6))
* add open telemetry tracer ([e6d7609](https://github.com/stfsy/node-api-kit/issues/commit/e6d7609b9e939989d654511f8429ec235e07c94a))
* add publish script, remove release-path script ([290444d](https://github.com/stfsy/node-api-kit/issues/commit/290444d1dbb07217192184ca2a0b51771996cd8d))
* add script to run jeager for local testing ([a7d9bf9](https://github.com/stfsy/node-api-kit/issues/commit/a7d9bf9668f5c962f0b8f6497569a57b3ec5ad90))
* **deps-dev:** bump c8 from 8.0.0 to 8.0.1 ([3006471](https://github.com/stfsy/node-api-kit/issues/commit/30064711aeee74a06598dcff09c7b51b22195d47))
* **deps-dev:** bump eslint from 8.44.0 to 8.45.0 ([f25ecf5](https://github.com/stfsy/node-api-kit/issues/commit/f25ecf59204968ef905dda1c4dfee8090c176a2b))
* **deps-dev:** bump eslint from 8.45.0 to 8.46.0 ([b8d56e0](https://github.com/stfsy/node-api-kit/issues/commit/b8d56e036c16d2ebd436da16589d99532374d16a))
* **deps-dev:** bump pino-pretty from 10.0.1 to 10.1.0 ([62c2de5](https://github.com/stfsy/node-api-kit/issues/commit/62c2de54e68f42acf510d8f8497503ed48ddddfb))
* **deps-dev:** bump pino-pretty from 10.1.0 to 10.2.0 ([4497ba6](https://github.com/stfsy/node-api-kit/issues/commit/4497ba69db38bbf6c3ce09e465405e70f814e26c))
* **deps:** add aws lambda instrumentation lib ([338afad](https://github.com/stfsy/node-api-kit/issues/commit/338afad20f21d3af4fb85f7deda77a1073cab770))
* **deps:** add semantic conventions ([2bcf682](https://github.com/stfsy/node-api-kit/issues/commit/2bcf682e82e439aea741c03b8b50624ca974fbbb))
* **deps:** bump pino from 8.14.1 to 8.14.2 ([cf9660e](https://github.com/stfsy/node-api-kit/issues/commit/cf9660e9e85a19c36d519d8e46a5984ee844446b))
* **deps:** bump re2 from 1.19.1 to 1.20.1 ([6aa6a41](https://github.com/stfsy/node-api-kit/issues/commit/6aa6a4175f001b087cff467dc9fea452c6aad460))
* **deps:** bump semver from 5.7.1 to 5.7.2 ([97e2b1b](https://github.com/stfsy/node-api-kit/issues/commit/97e2b1bcdbc4b7cd74e8df3d5a2d91c8ae2df512))
* **logger:** log trace and span id ([b413913](https://github.com/stfsy/node-api-kit/issues/commit/b41391301243e4990fadcdddee2f7c3dcf2de5af))
* run api with tracer ([311ac3e](https://github.com/stfsy/node-api-kit/issues/commit/311ac3e3819e691e0639172584027b30ec8eb537))
* run jaeger for testing ([cd9dcdf](https://github.com/stfsy/node-api-kit/issues/commit/cd9dcdfa7a6b09b9104841ff0c740abc4c9a8d49))
* **scripts:** add additional env vars for local testing ([ea18a3f](https://github.com/stfsy/node-api-kit/issues/commit/ea18a3f2fbe01b669cb46b50d4f9d163308080eb))
* set api host base url ([0fc5473](https://github.com/stfsy/node-api-kit/issues/commit/0fc5473fbaf32cd2cf0213e2543ab9af54fd2a64))
* support links for endpoints ([28f274b](https://github.com/stfsy/node-api-kit/issues/commit/28f274b4401528790fd957d0796f762c44ea81c4))
* update license ([dd179cc](https://github.com/stfsy/node-api-kit/issues/commit/dd179cc4f88bd8ff5f8ecaea9157ba25f15764f9))
* update path in push tags script ([14ebe6c](https://github.com/stfsy/node-api-kit/issues/commit/14ebe6c3599c539df32cd4c8dcfa1b86d4a4a9dd))
* update readmes ([a57f65b](https://github.com/stfsy/node-api-kit/issues/commit/a57f65bfe637f7d22a1fe58c4c37b6e4e1c00cb2))

## 0.1.0 (2023-07-11)


### Features

* add resource validator factory method ([ff296c4](https://github.com/stfsy/node-api-kit/issues/commit/ff296c41dab4fca4775243e40ba546dc49d38a7f))


### Bug Fixes

* created child logger without name ([2e8e37f](https://github.com/stfsy/node-api-kit/issues/commit/2e8e37fcc9903ad5db58f93afc5cee1a18026c79))


### Refactorings

* refactor example ([b1ba624](https://github.com/stfsy/node-api-kit/issues/commit/b1ba6245a53235407bdc3bfd0a626cb8febcacc3))
* refactor handle incoming request ([3b54703](https://github.com/stfsy/node-api-kit/issues/commit/3b54703d15f47443e192701da4f9a6d5f66b504f))


### Chores

* add api runners ([b5ea5b7](https://github.com/stfsy/node-api-kit/issues/commit/b5ea5b704df5e33a2319bc7cec4faae9a105c5a5))
* add configuration service ([44db929](https://github.com/stfsy/node-api-kit/issues/commit/44db9299b93bb04e80c0b9b3c7ffb5121d77adef))
* add endpoints ([b77e67f](https://github.com/stfsy/node-api-kit/issues/commit/b77e67f4dde2b12bc1797a374e15ff5ec9381bdb))
* add eslint config ([7ea26aa](https://github.com/stfsy/node-api-kit/issues/commit/7ea26aad6d2697a78fa0ddf6f244d59c7786a7e3))
* add github workflows files ([32f75f4](https://github.com/stfsy/node-api-kit/issues/commit/32f75f471d9dcbeb3397e4e13daf1582d6f33978))
* add gitignore ([3d2517f](https://github.com/stfsy/node-api-kit/issues/commit/3d2517f967a63b6b1b2d02fb3c50892401d63e4d))
* add http modules ([72683d2](https://github.com/stfsy/node-api-kit/issues/commit/72683d215f9e6a62b1d878aba11f5b6089ec8000))
* add license and license checker ([029910f](https://github.com/stfsy/node-api-kit/issues/commit/029910f9fa9cdc3bc283d6019b82a9da894a1459))
* add middlewares ([2865936](https://github.com/stfsy/node-api-kit/issues/commit/28659366db873172253d05b943eb5615a139cc91))
* add package files ([ebef1a5](https://github.com/stfsy/node-api-kit/issues/commit/ebef1a57fec2db93aad94f68ec283420d5d9520b))
* add readme ([e732d56](https://github.com/stfsy/node-api-kit/issues/commit/e732d56e4bf48f858fdd2ae55eeaada1f4a637cf))
* add readme for validation schema ([8a6d472](https://github.com/stfsy/node-api-kit/issues/commit/8a6d472519471a4ccbcac8374fb07e8dd6cb893a))
* add scripts ([f42c2a4](https://github.com/stfsy/node-api-kit/issues/commit/f42c2a4574948554783bffdb8186bec591be035f))
* add test helper ([079adad](https://github.com/stfsy/node-api-kit/issues/commit/079adad3913e0b41652110c28fc7408b100f5729))
* add types ([14f8181](https://github.com/stfsy/node-api-kit/issues/commit/14f8181c26a028123231802230df1c21340249d7))
* add utils ([12f2143](https://github.com/stfsy/node-api-kit/issues/commit/12f2143120caff14c55740d907be964e05c63e77))
* add validators ([4b4de7c](https://github.com/stfsy/node-api-kit/issues/commit/4b4de7c4b622bde48f15656d0998dbdc0051558d))
* add version config ([f8aa90f](https://github.com/stfsy/node-api-kit/issues/commit/f8aa90f475c3258fa9998831d67759a2d7291ba7))
* always add bodyparser ([3814eed](https://github.com/stfsy/node-api-kit/issues/commit/3814eeddb81cc9b3fd27c81f975efb9a07423218))
* **deps-dev:** bump eslint from 8.43.0 to 8.44.0 ([ffc61fc](https://github.com/stfsy/node-api-kit/issues/commit/ffc61fc5faacac64adcdfdaa350aa19a5bb6cb87))
* **deps-dev:** bump nodemon from 2.0.22 to 3.0.1 ([f44cdbd](https://github.com/stfsy/node-api-kit/issues/commit/f44cdbd0ac421fb67024a8c03e95ffc504c23ddc))
* **deps:** add pino logging dependencies ([f14bf8b](https://github.com/stfsy/node-api-kit/issues/commit/f14bf8b880c5004e09e908acd81fdd01225d7e3e))
* **deps:** bump jsonwebtoken from 9.0.0 to 9.0.1 ([d6f0ea2](https://github.com/stfsy/node-api-kit/issues/commit/d6f0ea2e902683dfa5b20d7d70d27bdcbe9294bb))
* fix error in eslint config ([7dcf68b](https://github.com/stfsy/node-api-kit/issues/commit/7dcf68b086877b65d156374d7f94b28f2fcafdde))
* update docs ([548be86](https://github.com/stfsy/node-api-kit/issues/commit/548be86317734098eb80ecc8b73338e8bf095e83))
* update docs ([734c3ac](https://github.com/stfsy/node-api-kit/issues/commit/734c3accb683d4dac35629fda01e825287821cb7))
* update env vars for base url configs ([6ae7387](https://github.com/stfsy/node-api-kit/issues/commit/6ae7387645fced805e7003d42911eb82e2c36d51))
* update headlines ([15966a4](https://github.com/stfsy/node-api-kit/issues/commit/15966a4454753b0a18e58db6e3e381bcd0a7f803))
* update parsing of env vars to match also NODE_ENV ([5218be5](https://github.com/stfsy/node-api-kit/issues/commit/5218be564e86c01568e15b9e6ddfe3ffc8cdb594))
* update readme ([19fe802](https://github.com/stfsy/node-api-kit/issues/commit/19fe802398d2f1584b47134f840bbf3794ae9f7d))
* update readme ([07b4664](https://github.com/stfsy/node-api-kit/issues/commit/07b4664c27d994810689d720c2fcbf95f5c1e92b))
* update README ([0893839](https://github.com/stfsy/node-api-kit/issues/commit/08938391f54611db137c58e9c7f963362037165d))
* update scripts and names ([06d8a4b](https://github.com/stfsy/node-api-kit/issues/commit/06d8a4b034686f13ee21bc8d62884398b2f7c124))
