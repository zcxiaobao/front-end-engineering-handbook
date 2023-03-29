function getZc() {
  setTimeout(() => {
    import("./zcxiaobao.js").then(({ firstName, lastName }) => {
      console.log(firstName + lastName);
    });
  }, 1000);
}

getZc();
