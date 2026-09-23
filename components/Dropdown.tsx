"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DropdownProps {
  options: string[];
  defaultValue?: string;
  name: string;
  onChange?: (value: string) => void;
  className?: string;
}

export default function Dropdown({
  options,
  defaultValue = options[0],
  name,
  onChange,
  className = "",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
    onChange?.(value);
  };

  return (
    <div
      ref={dropdownRef}
      className={`dropdown-wrapper ${className}`}
      style={{ position: "relative" }}
    >
      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={selected} />

      {/* Dropdown button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-button"
        whileHover={{ background: "rgba(255,255,255,.08)" }}
        whileTap={{ scale: 0.98 }}
      >
        <span>{selected}</span>
        <motion.svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <path d="M4 6l4 4 4-4" strokeWidth="2" strokeLinecap="round" />
        </motion.svg>
      </motion.button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="dropdown-menu"
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            {options.map((option) => (
              <motion.button
                key={option}
                type="button"
                onClick={() => handleSelect(option)}
                className={`dropdown-option ${selected === option ? "active" : ""}`}
                whileHover={{ background: "rgba(142,231,255,.15)" }}
                whileTap={{ scale: 0.97 }}
              >
                {selected === option && (
                  <span className="checkmark">✓</span>
                )}
                {option}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
