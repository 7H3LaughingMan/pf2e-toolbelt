import { MODULE, userIsGM } from "foundry-pf2e";
import { onRenderSettingsConfig, registerToolsSettings } from "./settings";
import type { ToolConfig } from "./tool";
import { actionableTool } from "./tools/actionable";
import { arpTool } from "./tools/arp";
import { betterMerchantTool } from "./tools/betterMerchant";
import { debugTool } from "./tools/debug";
import { effectsPanelTool } from "./tools/effectsPanel";
import { givethTool } from "./tools/giveth";
import { heroActionsTool } from "./tools/heroActions";
import { hideDamageTool } from "./tools/hideDamage";
import { mergeDamageTool } from "./tools/mergeDamage";
import { noBulkTool } from "./tools/noBulk";
import { ShareTool } from "./tools/share";
import { spellsSummaryTool } from "./tools/spellsSummary";
import { stancesTool } from "./tools/stances";
import { targetHelperTool } from "./tools/targetHelper";
import { templateHelperTool } from "./tools/templateHelper";
import { unidedTool } from "./tools/unided";
import { untargetTool } from "./tools/untarget";
import { useButtonTool } from "./tools/useButton";
import { undergroundTool } from "./tools/underground";
import { identifyTool } from "./tools/identify";
import { betterBrowserTool } from "./tools/browser";

MODULE.register("pf2e-toolbelt", "PF2e Toolbelt");

const TOOLS: ToolConfig[] = [
    actionableTool,
    arpTool,
    betterBrowserTool,
    betterMerchantTool,
    debugTool,
    untargetTool,
    effectsPanelTool,
    givethTool,
    heroActionsTool,
    hideDamageTool,
    identifyTool,
    mergeDamageTool,
    noBulkTool,
    ShareTool,
    unidedTool,
    spellsSummaryTool,
    stancesTool,
    targetHelperTool,
    templateHelperTool,
    undergroundTool,
    useButtonTool,
];

Hooks.once("init", () => {
    const isGM = userIsGM();

    registerToolsSettings(TOOLS, isGM);

    const module = MODULE.current;
    module.api = {};

    for (const { init, api, name } of TOOLS) {
        init?.(isGM);

        if (typeof api === "object") {
            module.api[name] = api;
        }
    }
});

Hooks.once("ready", () => {
    const isGM = game.user.isGM;

    for (const { ready } of TOOLS) {
        ready?.(isGM);
    }
});

Hooks.on("renderSettingsConfig", onRenderSettingsConfig);
