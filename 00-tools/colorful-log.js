const Style = {
    base: [
        "color: #fff",
        "background-color: #444",
        "padding: 2px 4px",
        "border-radius: 2px"
    ],
    warning: [
        "color: #eee",
        "background-color: red"
    ],
    success: [
        "background-color: green"
    ]
}
const log = (text, extra = []) => {
    let style = Style.base.join(';') + ';';
    style += extra.join(';'); // Add any additional styles
    console.log(`%c${text}`, style);
}

log("Normal Logs");
log("Warning Logs", Style.warning);
log("Success Logs", Style.success);
