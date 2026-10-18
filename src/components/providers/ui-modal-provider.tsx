"use client";

import dynamic from "next/dynamic";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const SignInModal = dynamic(
  () =>
    import("@/components/modals/sign-in-modal").then((mod) => mod.SignInModal),
  { ssr: false },
);
const CollectionModal = dynamic(
  () =>
    import("@/components/modals/collection-modal").then(
      (mod) => mod.CollectionModal,
    ),
  { ssr: false },
);
const ExternalInfoModal = dynamic(
  () =>
    import("@/components/modals/external-info-modal").then(
      (mod) => mod.ExternalInfoModal,
    ),
  { ssr: false },
);
const SaveResultModal = dynamic(
  () =>
    import("@/components/modals/save-result-modal").then(
      (mod) => mod.SaveResultModal,
    ),
  { ssr: false },
);

type ModalType = "signin" | "collection" | "external-info" | "save-result" | null;

type UiModalContextValue = {
  openSignIn: () => void;
  openCollection: () => void;
  openExternalInfo: () => void;
  openSaveResult: (styleId: string) => void;
  closeModal: () => void;
};

const UiModalContext = createContext<UiModalContextValue | null>(null);

export function UiModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalType>(null);
  const [saveStyleId, setSaveStyleId] = useState<string | null>(null);

  const closeModal = useCallback(() => {
    setModal(null);
    setSaveStyleId(null);
    document.body.classList.remove("no-scroll");
  }, []);

  const open = useCallback((type: ModalType) => {
    setModal(type);
    document.body.classList.add("no-scroll");
  }, []);

  const value = useMemo(
    () => ({
      openSignIn: () => open("signin"),
      openCollection: () => open("collection"),
      openExternalInfo: () => open("external-info"),
      openSaveResult: (styleId: string) => {
        setSaveStyleId(styleId);
        open("save-result");
      },
      closeModal,
    }),
    [open, closeModal],
  );

  return (
    <UiModalContext.Provider value={value}>
      {children}
      {modal === "signin" && <SignInModal onClose={closeModal} />}
      {modal === "collection" && <CollectionModal onClose={closeModal} />}
      {modal === "external-info" && <ExternalInfoModal onClose={closeModal} />}
      {modal === "save-result" && saveStyleId && (
        <SaveResultModal styleId={saveStyleId} onClose={closeModal} />
      )}
    </UiModalContext.Provider>
  );
}

export function useUiModals() {
  const ctx = useContext(UiModalContext);
  if (!ctx) throw new Error("useUiModals must be used within UiModalProvider");
  return ctx;
}
