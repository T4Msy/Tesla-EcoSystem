import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function Sheet({ open, onClose, children, title }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 200 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120) onClose();
            }}
            className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-50 glass-strong rounded-t-[28px] pb-safe"
          >
            <div className="pt-2 flex justify-center">
              <div className="h-1.5 w-10 rounded-full bg-white/20" />
            </div>
            {title && (
              <div className="px-5 pt-3 pb-1 text-[15px] font-semibold">{title}</div>
            )}
            <div className="px-5 pb-4">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
