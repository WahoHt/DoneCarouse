var myapp = angular.module("myApp", [
  "ngMessages",
  "ui.router",
  "ngAnimate",
  "ngSanitize",
  "ngMaterial",
  "ui.bootstrap",
]);
myapp.config(function ($stateProvider, $locationProvider) {
  $locationProvider
    .html5Mode({
      enabled: false, //true
      requireBase: true, //false
      // rewriteLinks: true
    })
    .hashPrefix("");

  $stateProvider
    .state("route1", {
      url: "/",
      templateUrl: "./html/route1.html",
      controller: "tabsCtrl",
    })
    .state("route2", {
      url: "/route2",
      templateUrl: "./html/route2.html",
      controller: "promiseCtrl",
    })
    .state("route3", {
      url: "/route3",
      templateUrl: "./html/route3.html",
      controller: "addUserForm",
    })
    .state("route4", {
      url: "/route4",
      templateUrl: "./html/route4.html",
      controller: "addNewTextDirectives",
    })
    .state("route5", {
      url: "/route5",
      templateUrl: "./html/route5.html",
      controller: "routeFiveCtrl",
    })
    .state("route5.headerRoute5", {
      url: "/header/route5",
      templateUrl: "./html/headerRoute5.html",
      controller: "routeFiveHeader",
    })
    .state("route6", {
      url: "/route6",
      templateUrl: "./html/route6.html",
      controller: "routeFactory",
    })
    .state("route7", {
      url: "/route7",
      templateUrl: "./html/route7.html",
      controller: "imageLocalStr",
    })
    .state("route8", {
      url: "/route8",
      templateUrl: "./html/route8.html",
      controller: "bootstrapSlider",
    });
});

myapp.controller("tabsCtrl", [
  "$scope",
  function ($scope) {
    const tabs = [
      {
        title: "One",
        image: [
          {
            text: "Google1",
            url: "https://www.google.com/images/srpr/logo11w.png",
          },
          {
            text: "Angular1",
            url: "https://material.angularjs.org/latest/img/logo.svg",
          },
          {
            text: "Google2",
            url: "https://www.google.com/images/srpr/logo11w.png",
          },
          {
            text: "Angular2",
            url: "https://material.angularjs.org/latest/img/logo.svg",
          },
        ],
      },
    ];
    console.log("1");
    $scope.table = { fields: [] };
    $scope.tabs = tabs;
    (selected = null), (previous = null);
    $scope.current = 0; // index img
    $scope.isActive = function (index) {
      return $scope.current === index;
    };

    $scope.prevSlide = function (index) {
      // prev image slider
      $scope.current =
        $scope.current > 0
          ? --$scope.current
          : $scope.tabs[index].image.length - 1;
    };

    $scope.nextSlide = function (index) {
      // next image slider
      $scope.current =
        $scope.current < $scope.tabs[index].image.length - 1
          ? ++$scope.current
          : 0;
    };

    $scope.selectedIndex = 0;
    $scope.$watch("selectedIndex", function (newVal) {
      previous = selected;
      selected = tabs[newVal];
    });

    $scope.addTab = function (tTitle) {
      tabs.push({ title: tTitle, image: $scope.table.fields });
      // console.log(this)
    };

    $scope.addInpContent = function () {
      $scope.table.fields.push({ text: "", url: "" });
    };
    $scope.removeInpContent = function () {
      $scope.table.fields.pop();
    };
  },
]);

myapp.controller("promiseCtrl", [
  "$scope",
  "$http",
  function ($scope, $http) {
    $scope.getData = (function () {
      $http({
        method: "GET",
        url: "https://api-dev.outfittalent.com/event/featured?count=20",
      }).then(function (response) {
        $scope.Event = response.data.data;
        console.log(response.data.data);
        // return response.data;
      });
      $scope.oneAtATime = true;
      $scope.isOpen = false;

      $scope.updateOpenStatus = function () {
        $scope.isOpen = $scope.groups.some(function (item) {
          return item.isOpen;
        });
      };
    })();
  },
]);

myapp.controller("addUserForm", [
  "$scope",
  function ($scope) {
    $scope.userData = {
      users: [],
    };
    $scope.addItems = function (lastname, email, password) {
      $scope.userData.users.push({
        user: lastname,
        useremail: email,
        userpassword: password,
      });
    };
  },
]);

myapp.controller("addNewTextDirectives", function () {
  console.log("1");
});

myapp.directive("error", function () {
  return {
    link: function (scope, element, attrs) {
      element.on("click", function () {
        if (element.text() === "error") {
          element.text("Block1");
        } else {
          element.text("error");
        }
      });
      // console.log('mydar');
      // console.log('scope', scope);
      // console.log('element', element);
      // console.log('attrs', attrs);
    },
  };
});

myapp.controller("routeFiveCtrl", [
  "$scope",
  function ($scope) {
    $scope.emitClick = function (event) {
      $scope.$broadcast("SendDown", "Я опустился");
    };
    $scope.$on("SendUp", function (event, data) {
      $scope.data = data;
    });
  },
]);

myapp.controller("routeFiveHeader", [
  "$scope",
  function ($scope) {
    $scope.$on("SendDown", function (event, data) {
      $scope.data = data;
    });
    $scope.emitClick = function (event) {
      $scope.$emit("SendUp", "Я поднялся");
    };
  },
]);

/////////////////////// FACTORY

myapp.factory("fromFactory", function () {
  let factoryHello = {};
  factoryHello.message = "Hello its Factory";
  return factoryHello;

  // let randomObject = {}
  // let num = Math.floor(Math.random()*100);
  // randomObject.generate = function(){
  //   return num;
  // }
  // return randomObject;
});

myapp.constant("constData", {
  message: "constant",
});

myapp.service("fromService", function () {
  this.message = "hello its Service";
  // $scope.message = 'hello its Service'
});

myapp.provider("fromProvider", function () {
  let newMessage = "hello its Provider";
  return {
    $get: function () {
      return {
        message: newMessage,
      };
    },
  };
});

myapp.value("myValue", "First Assignment");

myapp.provider("fromProviderTwo", function (constData) {
  // console.log(valueSS)
  let newMessage = "hello its Provider " + constData.message;
  return {
    $get: function () {
      return {
        message: newMessage,
      };
    },
  };
});

myapp.controller(
  "routeFactory",
  function ($scope, fromFactory, fromService, fromProvider, fromProviderTwo) {
    // $scope.generNumber = function(){
    //   $scope.randomNumber1 = fromFactory.generate();
    // }
    $scope.privet = [
      fromFactory.message,
      fromService.message,
      fromProvider.message,
      fromProviderTwo.message,
    ];
    $scope.privet2 = fromService.message;
  }
);

myapp.controller("imageLocalStr", [
  "$scope",
  function ($scope) {
    if (localStorage.getItem("Images") !== null) {
      $scope.dataImageLoc = JSON.parse(localStorage.getItem("Images"));
    }

    function getImageSize(file) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = function () {
          resolve({
            width: img.width,
            height: img.height,
          });
        };
        img.src = URL.createObjectURL(file);
      });
    }

    async function handleFileSelect(evt) {
      let files = evt.target.files; // FileList object

      const errors = {};

      let invalidImages = []; //

      $scope.errorImg = invalidImages;

      const validImages = [];

      for (let i = 0; i < files.length; i++) {
        const el = files[i];
        const { width, height } = await getImageSize(el);
        const id = Date.now() * Math.random(0, 99);
        //Date.now()

        errors[id] = {};

        if (width >= 500) {
          // errors[id].width = true;
          errors[id].width = "Широкая";
        }
        if (height >= 500) {
          // errors[id].height = true;
          errors[id].height = "Высокая";
        }

        if (el.type !== "image/png") {
          // errors[id].type = true;
          errors[id].type = "Не допустимый тип";
        }

        if (el.size > 80000) {
          // errors[id].size = true;
          errors[id].size = "Большой размер картинки";
        }

        const isValid = !!Object.keys(errors[id]).length;

        if (isValid) {
          invalidImages.push(Object.assign(el, { id, width, height }));
        } else {
          // validImages.push(el)
          validImages.push(Object.assign(el, { id }));
        }
        // return !isValid;
      }

      // console.log("valid", validImages);
      // console.log("invalid", invalidImages);
      // console.log("errors", errors);

      let objectBase64Images = [];
      validImages.forEach((el) => {
        var reader = new FileReader();
        reader.onloadend = function () {
          let dataBase64 = reader.result;
          let idItem = el.id;
          objectBase64Images.push(Object.assign({}, { idItem, dataBase64 }));
          localStorage.setItem("Images", JSON.stringify(objectBase64Images));
        };
        reader.readAsDataURL(el);
      });
      let errorUserImage = [];
      $scope.errorUserImage = errorUserImage;
      let name;
      invalidImages.forEach((item) => {
        name = item.name;
        errorUserImage.push(Object.assign(errors[item.id], { name }));
      });
    }
    $scope.submitImages = function () {
      let dataImagesLocalStorage = JSON.parse(localStorage.getItem("Images"));
      $scope.dataImageLoc = dataImagesLocalStorage;
    };
    $scope.removeImg = function (idItem) {
      let newSetItemRemoveImg = [];
      let dataImgRemove = JSON.parse(localStorage.getItem("Images"));
      dataImgRemove.forEach((item) => {
        if (item.idItem !== idItem) {
          newSetItemRemoveImg.push(item);
        }
      });
      localStorage.setItem("Images", JSON.stringify(newSetItemRemoveImg));
      $scope.dataImageLoc = JSON.parse(localStorage.getItem("Images"));
    };

    //////////////////////////////////////////// CARUS /////////////////////////////////////////

    $scope.current = 0;
    $scope.prevSlide = function () {
      $scope.current =
        $scope.current > 0 ? --$scope.current : $scope.dataImageLoc.length - 1;
    };

    $scope.nextSlide = function () {
      $scope.current =
        $scope.current < $scope.dataImageLoc.length - 1 ? ++$scope.current : 0;
    };

    document
      .getElementById("files")
      .addEventListener("change", handleFileSelect, false);
  },
]);

myapp.controller("bootstrapSlider", [
  "$scope",
  function ($scope) {
    // $scope.active = 0;

    // $scope.slides = [
    //   { image: "//unsplash.it/600/300" },
    //   { image: "//unsplash.it/601/300" },
    //   { image: "//unsplash.it/603/300" },
    // ];
    $scope.noWrapSlides = false;
    $scope.active = 0;
    const tabs = [
      {
        title: "One",
        image: [
          {
            text: "Google1",
            url: "https://www.google.com/images/srpr/logo11w.png",
          },
          {
            text: "Angular1",
            url: "https://material.angularjs.org/latest/img/logo.svg",
          },
          {
            text: "Google2",
            url: "https://www.google.com/images/srpr/logo11w.png",
          },
          {
            text: "Angular2",
            url: "https://material.angularjs.org/latest/img/logo.svg",
          },
        ],
      },
    ];
    let current = 0;
    $scope.current = current; // index img
    $scope.isActive = function (index) {
      return $scope.current === index;
    };
    $scope.tabs = tabs;
    $scope.table = { fields: [] };
    $scope.addTab = function (tTitle) {
      tabs.push({ title: tTitle, image: $scope.table.fields });
      console.log(tabs);
    };
    $scope.addInpContent = function () {
      $scope.table.fields.push({ text: "", url: "" });
    };
    $scope.removeInpContent = function () {
      $scope.table.fields.pop();
    };
  },
]);

// $scope.myInterval = 5000;
// $scope.noWrapSlides = false;
// $scope.active = 0;
// $scope.table = { fields: [] };
// // var slides = $scope.slides = [];
// // var currIndex = 0;
// const tabs = [
//   {
//     title: "One",
//     image: [
//       {
//         text: "Google1",
//         url: "https://www.google.com/images/srpr/logo11w.png",
//       },
//       {
//         text: "Angular1",
//         url: "https://material.angularjs.org/latest/img/logo.svg",
//       },
//       {
//         text: "Google2",
//         url: "https://www.google.com/images/srpr/logo11w.png",
//       },
//       {
//         text: "Angular2",
//         url: "https://material.angularjs.org/latest/img/logo.svg",
//       },
//     ],
//   },
// ];
// $scope.slides = tabs
// $scope.table = { fields: [] };
// $scope.tabs = tabs;

// $scope.addTab = function (tTitle) {
//   tabs.push({ title: tTitle, image: $scope.table.fields});
// };

// $scope.addInpContent = function () {
//   $scope.table.fields.push({ text: "", url: "" });
//   console.log($scope.active)
// };
// $scope.removeInpContent = function () {
//   $scope.table.fields.pop();
// };

////////////////////////////////
// $scope.myInterval = 5000;
//     $scope.noWrapSlides = false;
//     $scope.active = 0;
//     $scope.table = { fields: [] };
//     // var slides = $scope.slides = [];
//     var currIndex = 0;
//     $scope.currIndex = currIndex
//     let tabs = [{
//       title:'One',
//       image: [
//         {
//           url: "https://www.google.com/images/srpr/logo11w.png",
//         },
//         {
//           url: "http://pngimg.com/uploads/chocolate_cake/chocolate_cake_PNG60.png",
//         },
//         {
//           url: "https://www.google.com/images/srpr/logo11w.png",
//         },
//         {
//           url: "http://pngimg.com/uploads/chocolate_cake/chocolate_cake_PNG60.png",
//         }
//       ],
//     },];
//     $scope.tabs = tabs
//     $scope.slides = tabs
//     // $scope.addSlide = function() {
//     //   // console.log(tabs)
//     //   // tabs.forEach((item)=>{
//     //   //   console.log(item)
//     //   //   slides.push(Object.assign({},{
//     //   //     image: item.image[i].url,
//     //   //     // title:item.title,
//     //   //     id: currIndex++
//     //   //   }));
//     //   // })
//     // };
//     $scope.addInpContent = function () {
//       $scope.table.fields.push({ text: "", url: "" });
//     };
//     $scope.removeInpContent = function () {
//       $scope.table.fields.pop();
//     };

//     $scope.addTab = function (tTitle) {
//       tabs.push({ title: tTitle});
//       slides.push({ image: $scope.table.fields })
//     };

//     // for (var i = 0; i < 4; i++) {
//     //     $scope.addSlide();
//     //   }

//     function assignNewIndexesToSlides(indexes) {
//       for (var i = 0, l = slides.length; i < l; i++) {
//         slides[i].id = indexes.pop();
//       }
//     }

//     $scope.randomize = function() {
//       var indexes = generateIndexesArray();
//       assignNewIndexesToSlides(indexes);
//     };

//     function generateIndexesArray() {
//       var indexes = [];
//       for (var i = 0; i < currIndex; ++i) {
//         indexes[i] = i;
//       }
//       return shuffle(indexes);
//     }

//     function shuffle(array) {
//       var tmp, current, top = array.length;

//       if (top) {
//         while (--top) {
//           current = Math.floor(Math.random() * (top + 1));
//           tmp = array[current];
//           array[current] = array[top];
//           array[top] = tmp;
//         }
//       }

//       return array;
// }
