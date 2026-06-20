"use client";

import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Button from "@/modules/shared/component/Button";

export interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
}

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  loading = false,
}: ConfirmModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          className:
            "bg-surface-container border border-border-low-contrast rounded-2xl",
        },
      }}
    >
      <DialogTitle className="text-on-surface font-headline-md">{title}</DialogTitle>
      {description && (
        <DialogContent className="text-on-surface-variant text-body-sm">
          {description}
        </DialogContent>
      )}
      <DialogActions className="gap-2 px-6 pb-4">
        <Button variant="ghost" onClick={onClose} disabled={loading}>
          {cancelLabel}
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={loading}>
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
