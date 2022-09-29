// 在这里书写 JS 代码逻辑
import { createApp } from "https://unpkg.com/petite-vue?module";
import { state } from "https://unpkg.com/vue-petite-transition@1.2.0/dist/vue-petite-transition.es.js";
createApp({
  // states:
  sweetNothing: "",
  alertMsg: "",
  isMounted: false,
  isShowAlert: false,

  // template refs
  $alert: null,

  // methods:
  submitSweetNothing() {
    fetch("/api/sweet-nothings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sentences: [this.sweetNothing],
      }),
    })
      .then((res) => res.json())
      .then(() => {
        this.showAlert("成功添加了一句情话！");
      });
  },
  showAlert(msg) {
    this.alertMsg = msg;
    this.isShowAlert = true;
    setTimeout(() => this.closeAlert(), 2000);
  },
  closeAlert() {
    this.isShowAlert = false;
  },
})
  .directive("state", state)
  .mount();
