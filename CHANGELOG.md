# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.9.0](https://github.com/stfsy/node-api-kit/issues/compare/v0.8.0...v0.9.0) (2023-08-12)


### Features

* **middlewares:** add html-encoder middleware ([7b0a097](https://github.com/stfsy/node-api-kit/issues/commit/7b0a097a4290c41493b01663ea16020ac29f072a))


### Chores

* add encoder middleware to test servers ([1873072](https://github.com/stfsy/node-api-kit/issues/commit/1873072f7296b5b04ce8b12136bc8d3e409f50e9))
* **deps:** install html-entities ([e76d69b](https://github.com/stfsy/node-api-kit/issues/commit/e76d69b02923c77ea5e8ce1698b1f9c47b29ce3c))
* make scripts executable ([f956ba0](https://github.com/stfsy/node-api-kit/issues/commit/f956ba0ae2ae365e2ac0d3e3b02ec05866dfc411))

## [0.8.0](https://github.com/stfsy/node-api-kit/issues/compare/v0.7.0...v0.8.0) (2023-08-11)


### Features

* add resource id validator ([0b0d20c](https://github.com/stfsy/node-api-kit/issues/commit/0b0d20cf440d5c70f92623efee6ecb725acc7305))
* **links:** expose new createLinksForSelf method ([2e3e855](https://github.com/stfsy/node-api-kit/issues/commit/2e3e855887bd2a12eea007cb3bb5a29cd514193a))


### Refactorings

* move validator specs to correct folder ([b4b350f](https://github.com/stfsy/node-api-kit/issues/commit/b4b350f9c8ad84c9cacde3ddeb9bdf67cf367c65))
* **validator:** convert to es6 class ([c151595](https://github.com/stfsy/node-api-kit/issues/commit/c15159551dc2f7fc26f9b2c704146a5ba8ac7f27))


### Chores

* add script to remove types ([95958c7](https://github.com/stfsy/node-api-kit/issues/commit/95958c748cafb643c1e40c468efac8d879252aa2))
* correct license to match spdy ([c81ef3f](https://github.com/stfsy/node-api-kit/issues/commit/c81ef3f432a9c187b8f7b25994e4b9a32b27423f))
* **validation:** also export validator constructor ([f1f752d](https://github.com/stfsy/node-api-kit/issues/commit/f1f752da87e9ecb40f77f40af48dc7a546e32883))

## [0.7.0](https://github.com/stfsy/node-api-kit/issues/compare/v0.6.0...v0.7.0) (2023-08-09)


### Features

* **links:** add method to create links for only self ([4a2e546](https://github.com/stfsy/node-api-kit/issues/commit/4a2e546dff1e173c6350b8a7929f2bac66005d9a))


### Refactorings

* use generic release script ([28dfd57](https://github.com/stfsy/node-api-kit/issues/commit/28dfd571c5aa2ecad70a89f5b0c9ba72d196ff54))


### Chores

* add types to gitignore ([26c718e](https://github.com/stfsy/node-api-kit/issues/commit/26c718e606d9d5a2729be0fb8f5b1d13b3930347))
* remove token from release action ([0008297](https://github.com/stfsy/node-api-kit/issues/commit/00082979419be85e995403a070eb9209a1ccd4e5))

## [0.6.0](https://github.com/stfsy/node-api-kit/issues/compare/v0.5.0...v0.6.0) (2023-08-09)


### Features

* define prefix for keys that should not be returned to the client ([4929fe5](https://github.com/stfsy/node-api-kit/issues/commit/4929fe5499cd2db103b109a51c0e00f2af37502d))


### Chores

* **ci:** use different release action ([d0edca7](https://github.com/stfsy/node-api-kit/issues/commit/d0edca76aaada412d4d5070a525998e9657a66e0))
* **deps:** update dependencies ([5d317ca](https://github.com/stfsy/node-api-kit/issues/commit/5d317ca5750152cbf708b09bcf75d976a4ef0661))

## [0.5.0](https://github.com/stfsy/node-api-kit/issues/compare/v0.4.0...v0.5.0) (2023-08-08)


### Chores

* add config for json serializer property ([307343f](https://github.com/stfsy/node-api-kit/issues/commit/307343fa170e9eabe5e72f36b9ccce950de250a1))
* add typesVersions configuration ([b48415b](https://github.com/stfsy/node-api-kit/issues/commit/b48415bae527ae9bb7f31b03e6228b2f7ef61af5))
* create index.js referencing all other index.jses ([f47771b](https://github.com/stfsy/node-api-kit/issues/commit/f47771bb1d023ae609fd726bebfb3d2baec0bf17))
* **deps:** bump import-in-the-middle, @opentelemetry/instrumentation, @opentelemetry/instrumentation-grpc and @opentelemetry/instrumentation-http ([3f6c648](https://github.com/stfsy/node-api-kit/issues/commit/3f6c648241c1538a0b3d6c34a3f2de0e23f2c69d))
* during release also create types ([03c0656](https://github.com/stfsy/node-api-kit/issues/commit/03c06568f6d7c5854cce8453b21c482ec2699bdc))
* **error-handler:** also log stack trace ([b835c62](https://github.com/stfsy/node-api-kit/issues/commit/b835c62043f8f7dcbd28a9c016ed9bf3f29c65e1))
* install typescript dev dependency ([fc4d8a4](https://github.com/stfsy/node-api-kit/issues/commit/fc4d8a46a7a11013226fef0a3f3bd45215e5751b))
* point configuration export to index.js ([d8b3635](https://github.com/stfsy/node-api-kit/issues/commit/d8b3635dbd8fd877c38c92894ea452704c64502d))
* rename index to api.js ([57e5f21](https://github.com/stfsy/node-api-kit/issues/commit/57e5f21b594ce15d17b8759979ad35d7d54640d1))

## [0.4.0](https://github.com/stfsy/node-api-kit/issues/compare/v0.3.0...v0.4.0) (2023-08-07)


### Chores

* **deps:** bump pino from 8.14.2 to 8.15.0 ([f44c34e](https://github.com/stfsy/node-api-kit/issues/commit/f44c34eac3e4d885fa6d42ab690fbe5e2ff15d8e))
* make work on node18 by not using localhost ([f1ef695](https://github.com/stfsy/node-api-kit/issues/commit/f1ef695089da34f0dfb22be31f55b85bfd7c012b))
* remove main entry ([2729763](https://github.com/stfsy/node-api-kit/issues/commit/27297636f19dc80ae9c54e10bc2b3dc1d98ebb90))
* update configuration export name ([b7faf3a](https://github.com/stfsy/node-api-kit/issues/commit/b7faf3a2ef4ca5f0c733f4d4a302455571651b51))

## [0.3.0](https://github.com/stfsy/node-api-kit/issues/compare/v0.2.0...v0.3.0) (2023-08-07)


### Bug Fixes

* **cacheable:** sync cacheable must use sync span ([8b180d5](https://github.com/stfsy/node-api-kit/issues/commit/8b180d5a9d019b7eb8f64f9177a0407e2f7af34d))
* **tracing:** callback not called with span argument ([6d16e12](https://github.com/stfsy/node-api-kit/issues/commit/6d16e1286079011a5ed96d87844bc71491adf341))


### Refactorings

* move http error handler to http folder ([6c01632](https://github.com/stfsy/node-api-kit/issues/commit/6c01632757b2530a28925b5d9264b0360d364ca2))


### Chores

* add single entrypoint for endpoints folder ([c8e3c07](https://github.com/stfsy/node-api-kit/issues/commit/c8e3c07392ac7c1c9220ae068e61e48311988f48))
* add single entrypoint for middleware folder ([a9aa8ef](https://github.com/stfsy/node-api-kit/issues/commit/a9aa8ef2bfe4a32e9899acfe2db79ce1133ca7fc))
* add single entrypoint for util folder ([dae8852](https://github.com/stfsy/node-api-kit/issues/commit/dae8852c005dca8a35f234131dd0dee5493d8cf7))
* add single entrypoint for validation folder ([bf00393](https://github.com/stfsy/node-api-kit/issues/commit/bf00393e19af776ca8c60b5189a23e6e2e262f04))
* add single single entrypoint for configuration folder ([9146088](https://github.com/stfsy/node-api-kit/issues/commit/9146088cfa772d1241eec9973ab2be373501bd35))
* **delete-endpoint:** send empty body and links ([d2e36d8](https://github.com/stfsy/node-api-kit/issues/commit/d2e36d8b7f53be82076d246cef641ec5823fead2))
* export http folder ([73cbffd](https://github.com/stfsy/node-api-kit/issues/commit/73cbffd6c6eb560627e40101164ba88359ab2347))
* **package:** add files property ([4964740](https://github.com/stfsy/node-api-kit/issues/commit/49647404e3a0fd1fb570b3cb692380118a670258))
* **utils:** update export names ([a047b10](https://github.com/stfsy/node-api-kit/issues/commit/a047b1070bd5a7bd24fa8af8a1a28fc6777c79f8))

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
