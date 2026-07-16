import React, { useState, useEffect, useCallback, useRef } from "react";
import Alert from "../components/Alert";
// thanks that one youtube tutorial on the internet :)
const Contact = ({ isOpen, onClose }) => {
  // Stores the values entered into the contact form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Controls the loading state while the email is being sent
  const [isLoading, setIsLoading] = useState(false);

  // Controls the alert shown after submitting the form
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  // References used for timers and pop up behavior.
  const alertTimeoutRef = useRef(null);
  const closeTimeoutRef = useRef(null);
  const shouldCloseRef = useRef(false);

  // Prevent the page from scrolling while the pop up is open.
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isOpen);

    // Cleanup when the pop up closes.
    return () => {
      document.body.classList.remove("overflow-hidden");
      clearTimeout(alertTimeoutRef.current);
      clearTimeout(closeTimeoutRef.current);
    };
  }, [isOpen]);

  // Updates the correct form field whenever the user types.
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // Displays a success or error message for a few seconds.
  const showAlertMessage = useCallback((type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);

    clearTimeout(alertTimeoutRef.current);

    alertTimeoutRef.current = setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  }, []);

  // Sends the contact form using EmailJS.
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);

      try {
        // Only load EmailJS when the form is submitted.
        const { default: emailjs } = await import("@emailjs/browser");

        await emailjs.send(
          "service_erthpya",
          "template_vmqpo6i",
          {
            from_name: formData.name,
            to_name: "Jake",
            from_email: formData.email,
            to_email: "jakerdevs@gmail.com",
            message: formData.message,
          },
          "8fAHAfS9GzbZCAoux"
        );

        // Clear the form after sending.
        setFormData({
          name: "",
          email: "",
          message: "",
        });

        // Show a success message.
        showAlertMessage("success", "Your message has been sent!");

        // Close the modal shortly after.
        closeTimeoutRef.current = setTimeout(() => {
          onClose();
        }, 1000);
      } catch (error) {
        console.error(error);

        // Show an error if something goes wrong.
        showAlertMessage("danger", "Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    },
    [formData, onClose, showAlertMessage]
  );

  // Don't render anything if the modal isn't open
  if (!isOpen) return null;

  return (
    <>
      {/* Success/Error notification */}
      {showAlert && <Alert type={alertType} text={alertMessage} />}

      {/* Dark background behind the modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
        onMouseDown={() => {
          shouldCloseRef.current = true;
        }}
        onClick={() => {
          // Close when clicking outside the modal.
          if (shouldCloseRef.current) {
            onClose();
          }
        }}
      >
        {/* Contact modal */}
        <div
          className="relative mx-4 flex w-full max-w-md transform-gpu flex-col items-center justify-center rounded-2xl border border-white/10 bg-primary p-5 will-change-transform"
          onMouseDown={(e) => {
            // Prevent closing when clicking inside the pop up
            shouldCloseRef.current = false;
            e.stopPropagation();
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-2xl text-neutral-400 transition-colors hover:text-white"
          >
            ✕
          </button>

          {/* Heading */}
          <div className="mb-10 flex w-full flex-col items-start gap-5">
            <h2 className="text-heading">Contact</h2>

            <p className="font-normal text-neutral-400">
              Looking for a{" "}
              <span className="font-semibold text-yellow-400">
                Technical Game Designer
              </span>{" "}
              or want to collaborate? I'd love to hear from you!
            </p>
          </div>

          {/* Contact form */}
          <form className="w-full" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-5">
              <label htmlFor="name" className="feild-label">
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                className="field-input field-input-focus"
                placeholder="Example: Jake DeRoma"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-5">
              <label htmlFor="email" className="feild-label">
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                className="field-input field-input-focus"
                placeholder="xxx@email.com"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Message */}
            <div className="mb-5">
              <label htmlFor="message" className="feild-label">
                Message
              </label>

              <textarea
                id="message"
                name="message"
                rows="4"
                className="field-input field-input-focus"
                placeholder="Whatever you want to say, I'm all ears!"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full cursor-pointer rounded-md bg-radial grid-special-color px-1 py-3 text-center text-lg hover-animation disabled:opacity-70"
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default React.memo(Contact);