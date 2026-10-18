"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";

type ModalType = "signin" | "collection" | "external-info" | "save-result" | null;

type SignInProps = { onClose: () => void };
type CollectionProps = { onClose: () => void };
type ExternalInfoProps = { onClose: () => void };
type SaveResultProps = { styleId: string; onClose: () => void };

type UiModalContextValue = {
  openSignIn: () => void;
  openCollection: () => void;
  openExternalInfo: () => void;
  openSaveResult: (styleId: string) => void;
  closeModal: () => void;
};

const UiModalContext = createContext<UiModalContextValue | null>(null);

/**
 * Modals are imported only when opened so guide pages do not download the
 * modal chunk at startup (N2).
 */
export function UiModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalType>(null);
  const [saveStyleId, setSaveStyleId] = useState<string | null>(null);
  const [SignInModal, setSignInModal] = useState<ComponentType<SignInProps> | null>(
    null,
  );
  const [CollectionModal, setCollectionModal] = useState<ComponentType<
    CollectionProps
  > | null>(null);
  const [ExternalInfoModal, setExternalInfoModal] = useState<ComponentType<
    ExternalInfoProps
  > | null>(null);
  const [SaveResultModal, setSaveResultModal] = useState<ComponentType<
    SaveResultProps
  > | null>(null);

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
      openSignIn: () => {
        void import("@/components/modals/sign-in-modal").then((mod) => {
          setSignInModal(() => mod.SignInModal);
          open("signin");
        });
      },
      openCollection: () => {
        void import("@/components/modals/collection-modal").then((mod) => {
          setCollectionModal(() => mod.CollectionModal);
          open("collection");
        });
      },
      openExternalInfo: () => {
        void import("@/components/modals/external-info-modal").then((mod) => {
          setExternalInfoModal(() => mod.ExternalInfoModal);
          open("external-info");
        });
      },
      openSaveResult: (styleId: string) => {
        setSaveStyleId(styleId);
        void import("@/components/modals/save-result-modal").then((mod) => {
          setSaveResultModal(() => mod.SaveResultModal);
          open("save-result");
        });
      },
      closeModal,
    }),
    [open, closeModal],
  );

  return (
    <UiModalContext.Provider value={value}>
      {children}
      {modal === "signin" && SignInModal ? <SignInModal onClose={closeModal} /> : null}
      {modal === "collection" && CollectionModal ? (
        <CollectionModal onClose={closeModal} />
      ) : null}
      {modal === "external-info" && ExternalInfoModal ? (
        <ExternalInfoModal onClose={closeModal} />
      ) : null}
      {modal === "save-result" && SaveResultModal && saveStyleId ? (
        <SaveResultModal styleId={saveStyleId} onClose={closeModal} />
      ) : null}
    </UiModalContext.Provider>
  );
}

export function useUiModals() {
  const ctx = useContext(UiModalContext);
  if (!ctx) throw new Error("useUiModals must be used within UiModalProvider");
  return ctx;
}
