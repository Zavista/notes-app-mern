import SignUpModal from "./components/SignUpModal";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";
import { User } from "./models/user";
import * as NotesApi from "./network/notes_api";
import NotesPage from "./pages/NotesPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivacyPage from "./pages/PrivacyPage";
import NotFoundPage from "./pages/NotFoundPage";
import { Container } from "react-bootstrap";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const user = await NotesApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLoggedInUser();
  }, []);

  return (
    <BrowserRouter>
      <div>
        <NavBar
          loggedInUser={loggedInUser}
          onLoginClicked={() => setShowLoginModal(true)}
          onSignUpClicked={() => setShowSignUpModal(true)}
          onLogoutSuccessful={() => setLoggedInUser(null)}
        ></NavBar>

        <Container style={{ padding: "32px" }}>
          <Routes>
            <Route
              path="/"
              element={<NotesPage loggedInUser={loggedInUser}></NotesPage>}
            ></Route>
            <Route
              path="/privacy"
              element={<PrivacyPage></PrivacyPage>}
            ></Route>
            <Route path="/*" element={<NotFoundPage></NotFoundPage>}></Route>
          </Routes>
        </Container>

        {showSignUpModal && (
          <SignUpModal
            onDismiss={() => setShowSignUpModal(false)}
            onSignUpSuccessful={(user) => {
              setLoggedInUser(user);
              setShowSignUpModal(false);
            }}
          ></SignUpModal>
        )}

        {showLoginModal && (
          <LoginModal
            onDismiss={() => setShowLoginModal(false)}
            onLoginSuccessful={(user) => {
              setLoggedInUser(user);
              setShowLoginModal(false);
            }}
          ></LoginModal>
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
