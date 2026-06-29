package org.omegat.machinetranslators.deepseek;

import java.awt.KeyboardFocusManager;
import java.awt.event.KeyEvent;

import org.omegat.core.Core;
import org.omegat.util.Log;
import org.omegat.util.Preferences;

public final class DeepSeekPlugin {

    private static java.awt.KeyEventDispatcher hotkeyDispatcher;

    private DeepSeekPlugin() {
    }

    public static void loadPlugins() {
        Core.registerMachineTranslationClass(DeepSeekTranslate.class);
        registerHotkey();
    }

    public static void unloadPlugins() {
        if (hotkeyDispatcher != null) {
            KeyboardFocusManager.getCurrentKeyboardFocusManager()
                    .removeKeyEventDispatcher(hotkeyDispatcher);
            hotkeyDispatcher = null;
        }
    }

    /**
     * Registers a global hotkey (Ctrl+Shift+M) that toggles the
     * auto-insert / auto-confirm feature on and off.
     */
    private static void registerHotkey() {
        hotkeyDispatcher = new java.awt.KeyEventDispatcher() {
            @Override
            public boolean dispatchKeyEvent(KeyEvent e) {
                if (e.getID() == KeyEvent.KEY_PRESSED
                        && e.isControlDown()
                        && e.isShiftDown()
                        && !e.isAltDown()
                        && e.getKeyCode() == KeyEvent.VK_M) {
                    toggleAutoInsert();
                    return true;
                }
                return false;
            }
        };
        KeyboardFocusManager.getCurrentKeyboardFocusManager()
                .addKeyEventDispatcher(hotkeyDispatcher);
    }

    private static void toggleAutoInsert() {
        boolean current = Preferences.isPreference(DeepSeekTranslate.PROPERTY_AUTO_ACTIVE);
        boolean newState = !current;
        Preferences.setPreference(DeepSeekTranslate.PROPERTY_AUTO_ACTIVE, newState);
        String msg = "DeepSeek Auto: " + (newState ? "ON" : "OFF");
        Log.log(msg);
        // Show feedback in the progress area of the status bar
        try {
            Core.getMainWindow().showProgressMessage(msg);
        } catch (Exception ignored) {
            // Status bar may not be available (e.g. console mode)
        }
    }
}
