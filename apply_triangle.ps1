$f = 'C:\Users\danie\OneDrive\Coding\Asynchronous Training\index.html'
$text = [System.IO.File]::ReadAllText($f, [System.Text.Encoding]::UTF8)

$newCss = @'
        /* ---------- RRR triangle tier nav ---------- */
        .rrr-stack {
            display: flex;
            flex-direction: column;
            gap: 7px;
            max-width: 560px;
            margin: 4px auto 0;
        }
        /* Each tier is a horizontal slice of one shared triangle */
        .ts-item {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 120px;
            cursor: pointer;
            background:
                linear-gradient(180deg,
                    color-mix(in srgb, var(--theme-color) 14%, var(--surface)),
                    color-mix(in srgb, var(--theme-color) 28%, var(--surface)));
            transition: filter .2s, transform .18s, background .22s;
            -webkit-tap-highlight-color: transparent;
        }
        .ts-item[data-theme="Reason"]   { clip-path: polygon(24% 0, 76% 0, 84% 100%, 16% 100%); padding: 16px 24%; }
        .ts-item[data-theme="Relate"]   { clip-path: polygon(16% 0, 84% 0, 92% 100%, 8% 100%);  padding: 16px 16%; }
        .ts-item[data-theme="Regulate"] { clip-path: polygon(8% 0, 92% 0, 100% 100%, 0 100%);    padding: 16px 9%; }
        .ts-item:hover, .ts-item.ts-active {
            background:
                linear-gradient(180deg,
                    color-mix(in srgb, var(--theme-color) 26%, var(--surface)),
                    color-mix(in srgb, var(--theme-color) 42%, var(--surface)));
            filter: drop-shadow(0 7px 18px color-mix(in srgb, var(--theme-color) 42%, transparent));
        }
        .ts-item:hover { transform: translateY(-2px); }

        .ts-row { display: flex; align-items: center; gap: 13px; width: 100%; }
        .ts-text { position: relative; min-width: 0; flex: 1; }
        .ts-name {
            font-family: var(--display); font-weight: 700; font-size: 16px;
            color: #fff; margin: 0; letter-spacing: -0.01em;
        }
        .ts-region {
            font-size: 9.5px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
            color: color-mix(in srgb, var(--theme-color) 70%, #ffffff); margin: 2px 0 0;
        }
        .ts-desc { font-size: 11.5px; color: var(--text-2); margin: 4px 0 0; line-height: 1.4; }

        /* detailed brain on a light backing chip so the line-art + colour read clearly */
        .ts-brain {
            flex: none; width: 64px; height: 64px;
            background: rgba(240,244,250,0.94);
            border-radius: 11px;
            padding: 2px;
            display: flex; align-items: center; justify-content: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.25);
            transition: transform .25s;
        }
        .ts-item:hover .ts-brain, .ts-item.ts-active .ts-brain { transform: scale(1.05); }
        .ts-brain img { width: 100%; height: 100%; object-fit: contain; display: block; }

        .ts-icon, .ts-sessions { display: none; }

        @media (max-width: 560px) {
            .ts-item { min-height: 104px; }
            .ts-item[data-theme="Reason"]   { padding-inline: 17%; }
            .ts-item[data-theme="Relate"]   { padding-inline: 11%; }
            .ts-item[data-theme="Regulate"] { padding-inline: 6%; }
            .ts-desc { display: none; }
            .ts-brain { width: 52px; height: 52px; }
        }
'@

$newHtml = @'
                <div class="rrr-stack">

                    <!-- Tier 3: Reason (apex) -->
                    <div class="ts-item" data-theme="Reason" role="button" tabindex="0" style="--theme-color:var(--t-Reason)">
                        <span class="ts-icon"></span>
                        <div class="ts-row">
                            <div class="ts-brain"><img src="brain-imgs/brain-reason.png" alt="Brain with cortex highlighted"></div>
                            <div class="ts-text">
                                <p class="ts-name">Reason</p>
                                <p class="ts-region">Tier 3 &middot; Cortex</p>
                                <p class="ts-desc">Once we're regulated and related, the cortex can reason, reflect and plan.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Tier 2: Relate (middle) -->
                    <div class="ts-item" data-theme="Relate" role="button" tabindex="0" style="--theme-color:var(--t-Relate)">
                        <span class="ts-icon"></span>
                        <div class="ts-row">
                            <div class="ts-brain"><img src="brain-imgs/brain-relate.png" alt="Brain with limbic system highlighted"></div>
                            <div class="ts-text">
                                <p class="ts-name">Relate</p>
                                <p class="ts-region">Tier 2 &middot; Limbic System</p>
                                <p class="ts-desc">Connect before you correct &mdash; co-regulation works through the limbic brain.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Tier 1: Regulate (base) -->
                    <div class="ts-item" data-theme="Regulate" role="button" tabindex="0" style="--theme-color:var(--t-Regulate)">
                        <span class="ts-icon"></span>
                        <div class="ts-row">
                            <div class="ts-brain"><img src="brain-imgs/brain-regulate.png" alt="Brain with brainstem highlighted"></div>
                            <div class="ts-text">
                                <p class="ts-name">Regulate</p>
                                <p class="ts-region">Tier 1 &middot; Brainstem</p>
                                <p class="ts-desc">Settle the body first. When the brainstem feels safe, everything else follows.</p>
                            </div>
                        </div>
                    </div>

                </div>
'@

# replace CSS block
$cssPattern = '(?s)        /\* -+ RRR [^\r\n]*?tier nav -+ \*/.*?(?=        /\* -+ Term filter -+ \*/)'
$text = [regex]::Replace($text, $cssPattern, ($newCss + "`r`n`r`n"))

# replace HTML block
$htmlPattern = '(?s)                <div class="rrr-stack">.*?</div>\s*</section>'
$text = [regex]::Replace($text, $htmlPattern, ($newHtml + "`r`n            </section>"))

$text = ($text -replace "`r`n","`n") -replace "`n","`r`n"
$enc = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($f, $text, $enc)
Write-Host 'Applied triangle tier cards with detailed brains.'
