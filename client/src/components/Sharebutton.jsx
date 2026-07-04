import "../styles/Sharebutton.css";
import copyImg from "../assets/files-copy-interface-symbol.png";
import facebookImg from "../assets/communication.png";
import whatsappImg from "../assets/social.png";
import telegramImg from "../assets/telegram.png";

const Sharebutton = ({ blogurl }) => {
  const shareOptions = [
    {
      name: "Copy",
      action: () => {
        navigator.clipboard.writeText(blogurl);
        alert("URL copied to clipboard!");
      },
      img: copyImg,
    },
    {
      name: "WhatsApp",
      action: () => {
        window.open(
          `https:/https://codru-server.vercel.app.whatsapp.com/send?text=${encodeURIComponent(
            blogurl
          )}`,
          "_blank"
        );
      },
      img: whatsappImg,
    },
    {
      name: "Facebook",
      action: () => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            blogurl
          )}`,
          "_blank"
        );
      },
      img: facebookImg,
    },
    {
      name: "Telegram",
      action: () => {
        window.open(
          `https://telegram.me/share/url?url=${encodeURIComponent(blogurl)}`,
          "_blank"
        );
      },
      img: telegramImg,
    },
  ];

  return (
    <div className="share-options">
      {shareOptions.map((option, index) => (
        <button key={index} onClick={option.action} title={option.name}>
          <img src={option.img} alt={option.name} />
        </button>
      ))}
    </div>
  );
};

export default Sharebutton;
