$(document).ready(function() {
  // Product data to be used in shop and in cart
  var course = {
    "HTML": [
      "Introduction to Coding",
      "Code a simple one-page website using HTML and JQuery.",
      250,
      "http://media.idownloadblog.com/wp-content/uploads/2017/03/View-HTML.jpg",
      1
    ],
    "JavaScript": [
      "Beginner JavaScript",
      "Develop a basic proficiency in programming structures and methods in JavaScript so that you are able to create an interactive web application.",
      1800,
      "https://i.ytimg.com/vi/vZBCTc9zHtI/maxresdefault.jpg",
      1
    ],
    "Web Development": [
      "Beginner Front End Web Developer",
      "Develop a good proficiency in CSS and an understanding of web design principles so that you are able to create visually pleasing web pages.",
      1800,
      "http://web-site-app.com/wp-content/uploads/2016/04/front-end-web-development.jpg",
      1
    ],
    "Full Stack Javascript": [
      "Full Stack",
      "Develop an understanding of the front and backend development environment and basic proficiency in server side JavaScript and object-oriented programming.",
      1800,
      "https://cdnp-2f3a.kxcdn.com/blog/wp-content/uploads/2016/10/Full-Stack-Web-Development-826x1024.jpg",
      1
    ],
    "Website Development": [
      "Website Development",
      "Learn how to manage and deploy code to a server environment so that you can host your own web pages.",
      1200,
      "http://www.ovocreatives.com/wp-content/uploads/2017/05/web-development.jpg",
      1
    ],
    "Codestorm": [
      "Codestorm",
      "Work in groups to create and present a code project that addresses a particular issue.",
      1500,
      "https://www.codechef.com/download/small-banner/CDST2016/1458321015.jpg",
      1
    ],
    "Developer": [
      "Getting started as a developer",
      "Learn how to set up a development environment and practical skills to start coding.",
      250,
      "https://financialtribune.com/sites/default/files/field/image/17january/11_md_confab_380.jpeg",
      1
    ],
    "Deployment": [
      "Website Deployment",
      "Learn how to manage and deploy code to a server environment so that you can host your own web pages.",
      1200,
      "https://www.webpagefx.com/blog/images/assets/images.sixrevisions.com/2010/10/02-01_deploy_website_ld_img.jpg",
      1
    ],
    "Innovation Challenge": [
      "Innovation Challenge",
      "Work in groups to design an innovative solution to a social issue by using the design thinking process.",
      750,
      "http://www.skild.com/blog/wp-content/uploads/2010/12/IC_logo.jpg",
      1
    ],
    "Networking": [
      "Networking",
      "Learn how to present yourself professionally when networking and put your skills to the test by attending local tech events. You will attend a training session and attend one event of your choice.",
      1800,
      "http://morganconsulting.com/wp-content/uploads/2015/07/networking.jpg",
      1
    ],
    "Conversation Code": [
      "Conversation Code",
      "Learn about tech careers from a panel of working professionals who will share their experiences with you.",
      300,
      "https://images-na.ssl-images-amazon.com/images/I/41q8HFYwiEL.jpg",
      1
    ],
    "Tech Innovators Level 1": [
      "Tech Innovators Level 1",
      "Covering an introduction to web development as well as an introduction to design thinking, this course helps a learner explore how technology can be used for social innovation while developing fundamentals knowledge of programming. ",
      4200,
      "http://www.gastro.org/about/initiatives/CGIT.jpg",
      1
    ]
  };

  var $shop = $(".shop");
  var $cart = $(".cart-items");

  for (var data in course) {
    var itemName = course[data][0],
      itemDescription = course[data][1],
      itemPrice = course[data][2],
      itemImg = course[data][3],
      itemId = course[data][4],
      $template = $($("#productTemplate").html());

    $template.find("h1").text(itemName);
    $template.find("p").text(itemDescription);
    $template.find(".price").text("$" + itemPrice);
    $template.css("background-image", "url(" + itemImg + ")");

    $template.data("id", itemId);
    $template.data("name", itemName);
    $template.data("price", itemPrice);
    $template.data("image", itemImg);

    $shop.append($template);
  }

  $("body").on("blur", ".cart-items input", function() {
    var $this = $(this),
      $data = $this.parents("li");
    if (+$this.val() === 0) {
      $data.remove();
    } else {
      calculateSubtotal($data);
    }
    updateCartQuantity();
    calculateAndUpdate();
  });

  $("body").on("click", ".product .add", function() {
    var items = $cart.children(),
      $data = $(this).parents(".product"),
      $template = $($("#cartItem").html()),
      $matched = null,
      quantity = 0;

    $matched = items.filter(function(index) {
      var $this = $(this);
      return $this.data("id") === $data.data("id");
    });

    if ($matched.length) {
      quantity = +$matched.find(".quantity").val() + 1;
      $matched.find(".quantity").val(quantity);
      calculateSubtotal($matched);
    } else {
      $template
        .find(".cart-product")
        .css("background-image", "url(" + $data.data("image") + ")");
      $template.find("h3").text($data.data("name"));
      $template.find(".subtotal").text("$" + $data.data("price"));

      $template.data("id", $data.data("id"));
      $template.data("price", $data.data("price"));
      $template.data("subtotal", $data.data("price"));

      $cart.append($template);
    }

    updateCartQuantity();
    calculateAndUpdate();
  });

  function calculateSubtotal($data) {
    var quantity = $data.find(".quantity").val(),
      price = $data.data("price"),
      subtotal = quantity * price;
    $data.find(".subtotal").text("$" + subtotal);
    $data.data("subtotal", subtotal);
  }

  var $cartlink = $(".cart-link"),
    $wrap = $("#wrap");

  $cartlink.on("click", function() {
    $cartlink.toggleClass("active");
    $wrap.toggleClass("active");
    return false;
  });

  $wrap.on("click", function(e) {
    if (!$(e.target).is(".add")) {
      $wrap.removeClass("active");
      $cartlink.removeClass("active");
    }
  });

  function calculateAndUpdate() {
    var subtotal = 0,
      items = $cart.children(),
      shipping = items.length > 0 ? 5 : 0,
      tax = 0;
    items.each(function(index, data) {
      var $data = $(data),
        price = $data.data("subtotal");
      subtotal += price;
    });
    $(".subtotalTotal span").text(formatDollar(subtotal));
    tax = subtotal * 0.05;
    $(".taxes span").text(formatDollar(tax));
    $(".shipping span").text(formatDollar(shipping));
    $(".finalTotal span").text(formatDollar(subtotal + tax + shipping));
  }

  function updateCartQuantity() {
    var quantities = 0,
      $cartQuantity = $("span.cart-quantity"),
      items = $cart.children();
    items.each(function(index, data) {
      var $data = $(data),
        quantity = +$data.find(".quantity").val();
      quantities += quantity;
    });
    if (quantities > 0) {
      $cartQuantity.removeClass("empty");
    } else {
      $cartQuantity.addClass("empty");
    }
    $cartQuantity.text(quantities);
  }

  function formatDollar(amount) {
    return "$" + parseFloat(Math.round(amount * 100) / 100).toFixed(2);
  }

  $("body").on("keypress", ".cart-items input", function(ev) {
    var keyCode = window.event ? ev.keyCode : ev.which;
    if (keyCode < 48 || keyCode > 57) {
      if (keyCode != 0 && keyCode != 8 && keyCode != 13 && !ev.ctrlKey) {
        ev.preventDefault();
      }
    }
  });

  $(".addtocart").on("click", function() {
    $(this).addClass("active");
    setTimeout(function() {
      $(".addtocart").removeClass("active");
    }, 1000);
  });

  $(".checkout").on("click", function() {
    $(this).addClass("active");
    $(".success").css("display", "block");
    setTimeout(function() {
      $(".checkout").removeClass("active");
      $(".success").css("display", "none");
    }, 1000);
  });
});
