function openMaps(store) {
  let url = "";

  if (store === "rema") {
    url = "https://www.google.com/maps/search/?api=1&query=Rema+1000";
  }

  if (store === "kiwi") {
    url = "https://www.google.com/maps/search/?api=1&query=Kiwi";
  }

  if (store === "coop") {
    url = "https://www.google.com/maps/search/?api=1&query=Coop+Extra";
  }

  window.open(url, "_blank");
}
