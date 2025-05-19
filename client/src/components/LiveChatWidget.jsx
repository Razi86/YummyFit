import { useEffect } from "react";

const LiveChatWidget = () => {
  useEffect(() => {
    window.__lc = window.__lc || {};
    window.__lc.license = 19159501;
    window.__lc.integration_name = "manual_channels";
    window.__lc.product_name = "livechat";

    const maxWidth = 1600;
    const gutter = 20;

    const calculateRightOffset = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth <= maxWidth) {
        return gutter;
      }
      const excessSpace = (windowWidth - maxWidth) / 2;
      return excessSpace + gutter;
    };

    window.__lc.params = [{ name: "chat_window_position", value: "custom" }];
    window.__lc.custom_position = {
      bottom: 20,
      right: calculateRightOffset(),
    };

    const script = document.createElement("script");
    script.src = "https://cdn.livechatinc.com/tracking.js";
    script.async = true;
    document.body.appendChild(script);

    const updateWidgetDomPosition = () => {
      const widget = document.querySelector('iframe[src*="livechat"]')?.parentElement;
      if (widget) {
        widget.style.right = `${calculateRightOffset()}px`;
        widget.style.left = "auto";
        widget.style.bottom = "20px";
      }
    };

    const updatePosition = () => {
      if (window.LiveChatWidget) {
        window.LiveChatWidget.call("update_custom_position", {
          bottom: 20,
          right: calculateRightOffset(),
        });
      }
      updateWidgetDomPosition();
    };

    window.addEventListener("resize", updatePosition);

    window.__lc.asyncInit = function () {
      updatePosition();
    };

    const interval = setInterval(updatePosition, 500);

    return () => {
      window.removeEventListener("resize", updatePosition);
      clearInterval(interval);
    };
  }, []);

  return null;
};

export default LiveChatWidget;