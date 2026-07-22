interface ResizingDashProps {
    onStartResize: (e: React.TouchEvent | React.MouseEvent) => void;
}

export function ResizingDash({ onStartResize }: ResizingDashProps) {
    return (
        <div
            onMouseDown={onStartResize}
            onTouchStart={onStartResize}
            className="w-full flex items-center justify-center pt-3 pb-1 cursor-ns-resize touch-none select-none"
        >
            {/* The visible pill handle */}
            <div className="w-12 h-1.5 bg-slate-300 rounded-full hover:bg-slate-400 transition-colors" />
        </div>
    );
}