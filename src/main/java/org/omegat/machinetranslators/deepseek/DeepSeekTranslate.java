package org.omegat.machinetranslators.deepseek;

import java.awt.BorderLayout;
import java.awt.GridBagConstraints;
import java.awt.Window;
import java.util.Arrays;
import java.util.Hashtable;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;

import javax.swing.BorderFactory;
import javax.swing.JCheckBox;
import javax.swing.JComboBox;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JSlider;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.omegat.core.machinetranslators.BaseCachedTranslate;
import org.omegat.core.machinetranslators.BaseTranslate;
import org.omegat.core.machinetranslators.MachineTranslateError;
import org.omegat.gui.exttrans.MTConfigDialog;
import org.omegat.util.HttpConnectionUtils;
import org.omegat.util.Language;
import org.omegat.util.Log;
import org.omegat.util.Preferences;

public class DeepSeekTranslate extends BaseCachedTranslate {

    public static final String ALLOW_DEEPSEEK_TRANSLATE = "allow_deepseek_translate";
    public static final String PROPERTY_API_KEY = "deepseek.api.key";
    public static final String PROPERTY_MODEL = "deepseek.api.model";
    public static final String PROPERTY_URL = "deepseek.api.url";
    public static final String PROPERTY_TEMPERATURE = "deepseek.api.temperature";
    public static final String PROPERTY_DYNAMIC_TEMPERATURE = "deepseek.api.dynamic_temperature";

    private static final String MODEL_DEEPSEEK_V4_PRO = "deepseek-v4-pro";
    private static final String MODEL_DEEPSEEK_V4_FLASH = "deepseek-v4-flash";
    private static final String[] AVAILABLE_MODELS = { MODEL_DEEPSEEK_V4_PRO, MODEL_DEEPSEEK_V4_FLASH };
    private static final String DEFAULT_MODEL = MODEL_DEEPSEEK_V4_FLASH;
    private static final String DEFAULT_URL = "https://api.deepseek.com";
    private static final double DEFAULT_TEMPERATURE = 0.3;
    private static final int TEMPERATURE_MIN = 0;
    private static final int TEMPERATURE_MAX = 20;
    private static final int TEMPERATURE_DEFAULT_SLIDER = 3;
    private static final String CHAT_COMPLETIONS_PATH = "/chat/completions";
    private static final String BUNDLE_BASENAME = "org.omegat.machinetranslators.deepseek.Bundle";
    private static final ResourceBundle BUNDLE = ResourceBundle.getBundle(BUNDLE_BASENAME);
    private static final ObjectMapper MAPPER = new ObjectMapper();

    public DeepSeekTranslate() {
    }

    @Override
    protected String getPreferenceName() {
        return ALLOW_DEEPSEEK_TRANSLATE;
    }

    @Override
    public String getName() {
        return BUNDLE.getString("MT_ENGINE_DEEPSEEK");
    }

    @Override
    public boolean isConfigurable() {
        return true;
    }

    @Override
    protected String translate(Language sLang, Language tLang, String text) throws Exception {
        String apiKey = getApiKey();
        if (apiKey.isEmpty()) {
            throw new MachineTranslateError(BUNDLE.getString("MT_ENGINE_DEEPSEEK_API_KEY_NOTFOUND"));
        }

        String request = createJsonRequest(sLang, tLang, text);
        Map<String, String> headers = new LinkedHashMap<>();
        headers.put("Authorization", "Bearer " + apiKey);

        String response;
        try {
            response = HttpConnectionUtils.postJSON(getBaseUrl() + CHAT_COMPLETIONS_PATH, request, headers);
        } catch (HttpConnectionUtils.ResponseError e) {
            throw new MachineTranslateError(extractErrorMessage(e.body));
        }

        if (response == null) {
            return null;
        }

        String translated = extractTranslation(response);
        translated = BaseTranslate.unescapeHTML(translated);
        return cleanSpacesAroundTags(translated, text);
    }

    @Override
    public void showConfigurationUI(Window parent) {
        // Replace the default text field with a combo box for model selection
        JComboBox<String> modelComboBox = new JComboBox<>(AVAILABLE_MODELS);
        modelComboBox.setSelectedItem(getModel());

        boolean dynamicTemp = isDynamicTemperature();

        // Slider sub-panel (label + slider)
        JPanel sliderPanel = new JPanel(new BorderLayout(5, 0));
        JLabel tempLabel = new JLabel(BUNDLE.getString("MT_ENGINE_DEEPSEEK_TEMPERATURE_LABEL"));

        // Temperature slider: 0-20 represents 0.0-2.0 in 0.1 steps
        JSlider temperatureSlider = new JSlider(TEMPERATURE_MIN, TEMPERATURE_MAX,
                temperatureToSlider(getTemperature()));
        temperatureSlider.setMajorTickSpacing(5);
        temperatureSlider.setMinorTickSpacing(1);
        temperatureSlider.setPaintTicks(true);
        temperatureSlider.setPaintLabels(true);
        temperatureSlider.setSnapToTicks(true);
        Hashtable<Integer, JLabel> tempLabels = new Hashtable<>();
        tempLabels.put(0, new JLabel("0.0"));
        tempLabels.put(5, new JLabel("0.5"));
        tempLabels.put(10, new JLabel("1.0"));
        tempLabels.put(15, new JLabel("1.5"));
        tempLabels.put(20, new JLabel("2.0"));
        temperatureSlider.setLabelTable(tempLabels);

        sliderPanel.add(tempLabel, BorderLayout.WEST);
        sliderPanel.add(temperatureSlider, BorderLayout.CENTER);
        sliderPanel.setVisible(!dynamicTemp);

        // Dynamic temperature checkbox
        JCheckBox dynamicCheckBox = new JCheckBox(
                BUNDLE.getString("MT_ENGINE_DEEPSEEK_DYNAMIC_TEMPERATURE_LABEL"));
        dynamicCheckBox.setSelected(dynamicTemp);
        dynamicCheckBox.addActionListener(e -> {
            sliderPanel.setVisible(!dynamicCheckBox.isSelected());
            sliderPanel.getParent().revalidate();
        });

        MTConfigDialog dialog = new MTConfigDialog(parent, getName()) {
            @Override
            protected void onConfirm() {
                boolean temporary = panel.temporaryCheckBox.isSelected();
                String apiKey = panel.valueField1.getText().trim();
                String model = modelComboBox.getSelectedItem().toString();
                double temperature = sliderToTemperature(temperatureSlider.getValue());
                boolean dynamic = dynamicCheckBox.isSelected();

                setCredential(PROPERTY_API_KEY, apiKey, temporary);
                Preferences.setPreference(PROPERTY_MODEL, model);
                Preferences.setPreference(PROPERTY_TEMPERATURE, String.valueOf(temperature));
                Preferences.setPreference(PROPERTY_DYNAMIC_TEMPERATURE, dynamic);
                clearCache();
            }
        };

        dialog.panel.valueLabel1.setText(BUNDLE.getString("MT_ENGINE_DEEPSEEK_API_KEY_LABEL"));
        dialog.panel.valueField1.setText(getApiKey());
        dialog.panel.temporaryCheckBox.setSelected(isCredentialStoredTemporarily(PROPERTY_API_KEY));

        dialog.panel.valueLabel2.setText(BUNDLE.getString("MT_ENGINE_DEEPSEEK_MODEL_LABEL"));

        // valueField2 lives inside credentialsPanel which uses GridBagLayout
        java.awt.Container credentialsPanel = dialog.panel.valueField2.getParent();
        GridBagConstraints gbc = ((java.awt.GridBagLayout) credentialsPanel.getLayout())
                .getConstraints(dialog.panel.valueField2);
        credentialsPanel.remove(dialog.panel.valueField2);
        credentialsPanel.add(modelComboBox, gbc);
        credentialsPanel.revalidate();
        credentialsPanel.repaint();

        // Add temperature panel below credentials
        JPanel temperaturePanel = new JPanel(new BorderLayout(5, 0));
        temperaturePanel.setBorder(BorderFactory.createEmptyBorder(0, 0, 10, 0));
        temperaturePanel.add(dynamicCheckBox, BorderLayout.NORTH);
        temperaturePanel.add(sliderPanel, BorderLayout.CENTER);
        dialog.panel.itemsPanel.add(temperaturePanel);

        dialog.show();
    }

    protected String createJsonRequest(Language sLang, Language tLang, String text) throws JsonProcessingException {
        Map<String, Object> request = new LinkedHashMap<>();
        request.put("messages", createMessages(sLang, tLang, text));
        request.put("model", getModel());
        request.put("stream", false);
        if (!isDynamicTemperature()) {
            request.put("temperature", getTemperature());
        }

        return MAPPER.writeValueAsString(request);
    }

    protected String extractTranslation(String json) throws MachineTranslateError {
        try {
            JsonNode root = MAPPER.readTree(json);

            JsonNode error = root.get("error");
            if (error != null && !error.isNull()) {
                String message = error.path("message").asText("");
                if (message.isEmpty()) {
                    message = error.toString();
                }
                throw new MachineTranslateError(message);
            }

            JsonNode choices = root.get("choices");
            if (choices != null && choices.isArray() && !choices.isEmpty()) {
                JsonNode firstChoice = choices.get(0);
                JsonNode messageNode = firstChoice.get("message");
                if (messageNode != null) {
                    String content = messageNode.path("content").asText("");
                    if (!content.isEmpty()) {
                        return content;
                    }
                }

                String text = firstChoice.path("text").asText("");
                if (!text.isEmpty()) {
                    return text;
                }
            }
        } catch (MachineTranslateError e) {
            throw e;
        } catch (Exception e) {
            Log.logErrorRB(e, "MT_JSON_ERROR");
            throw new MachineTranslateError(BUNDLE.getString("MT_JSON_ERROR"));
        }

        throw new MachineTranslateError(BUNDLE.getString("MT_ENGINE_DEEPSEEK_BAD_RESPONSE"));
    }

    private String getApiKey() {
        return System.getProperty(PROPERTY_API_KEY, getCredential(PROPERTY_API_KEY));
    }

    private String getModel() {
        String model = System.getProperty(PROPERTY_MODEL, Preferences.getPreferenceDefault(PROPERTY_MODEL, DEFAULT_MODEL));
        return model.isEmpty() ? DEFAULT_MODEL : model;
    }

    private String getBaseUrl() {
        String baseUrl = System.getProperty(PROPERTY_URL, Preferences.getPreferenceDefault(PROPERTY_URL, DEFAULT_URL));
        return baseUrl.isEmpty() ? DEFAULT_URL : baseUrl;
    }

    private double getTemperature() {
        String temp = Preferences.getPreferenceDefault(PROPERTY_TEMPERATURE,
                String.valueOf(DEFAULT_TEMPERATURE));
        try {
            return Double.parseDouble(temp);
        } catch (NumberFormatException e) {
            Log.log(e);
            return DEFAULT_TEMPERATURE;
        }
    }

    private boolean isDynamicTemperature() {
        return Preferences.isPreference(PROPERTY_DYNAMIC_TEMPERATURE);
    }

    private static int temperatureToSlider(double temperature) {
        return (int) Math.round(temperature * 10.0);
    }

    private static double sliderToTemperature(int sliderValue) {
        return sliderValue / 10.0;
    }

    private static List<Map<String, String>> createMessages(Language sLang, Language tLang, String text) {
        return Arrays.asList(
                message("system", buildSystemPrompt(sLang, tLang)),
                message("user", text));
    }

    private static Map<String, String> message(String role, String content) {
        Map<String, String> message = new LinkedHashMap<>();
        message.put("role", role);
        message.put("content", content);
        return message;
    }

    private static String buildSystemPrompt(Language sLang, Language tLang) {
        return "You are a professional translation engine for OmegaT. Translate from "
                + describeLanguage(sLang) + " to " + describeLanguage(tLang)
                + ". Preserve tags, placeholders, and line breaks. Return only the translated text.";
    }

    private static String describeLanguage(Language language) {
        String locale = language.getLocaleCode();
        return (locale != null && !locale.isEmpty()) ? locale.replace('_', '-') : language.getLanguageCode();
    }

    private static String extractErrorMessage(String json) {
        try {
            JsonNode root = MAPPER.readTree(json);
            JsonNode error = root.get("error");
            if (error != null) {
                String message = error.path("message").asText("");
                if (!message.isEmpty()) {
                    return message;
                }
            }
        } catch (Exception e) {
            Log.log(e);
        }
        return BUNDLE.getString("MT_ENGINE_DEEPSEEK_BAD_RESPONSE");
    }
}
