import Cocoa

class WindowContorller: NSWindowController {
    override func windowDidLoad() {
        super.windowDidLoad()
        
        let appName = Bundle.main.infoDictionary?["CFBundleName"] as? String ?? "DCRefresher Rise"
        self.window?.title = appName
    }
}
