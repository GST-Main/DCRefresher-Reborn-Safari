import Cocoa

class WindowContorller: NSWindowController {
    override func windowDidLoad() {
        super.windowDidLoad()
        
        let appName = Bundle.main.infoDictionary?["CFBundleName"] as? String ?? "DCRefresher Reborn"
        self.window?.title = appName
    }
}
