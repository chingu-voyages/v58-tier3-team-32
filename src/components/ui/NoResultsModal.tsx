// To displays a pop-up like message when no search/filter results are found both on Map & List pages.
// By clicking outside the modal, it will close the modal.

"use client";
import React from "react";

type NoResultsModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function NoResultsModal({ visible, onClose }: NoResultsModalProps) {
  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white border border-gray-300 rounded-lg p-6 shadow-lg max-w-xs text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-bold text-red-500">No matching results found</p>
      </div>
    </div>
  );
}
