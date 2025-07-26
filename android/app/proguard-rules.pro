# Add project specific ProGuard rules here.
# You can control the set of applied configuration files using the
# proguardFiles setting in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# If your project uses WebView with JS, uncomment the following
# and specify the fully qualified class name to the JavaScript interface
# class:
#-keepclassmembers class fqcn.of.javascript.interface.for.webview {
#   public *;
#}

# Uncomment this to preserve the line number information for
# debugging stack traces.
#-keepattributes SourceFile,LineNumberTable

# If you keep the line number information, uncomment this to
# hide the original source file name.
#-renamesourcefileattribute SourceFile

# --- REGRAS ESPECÍFICAS PARA CAPACITOR E MAINACTIVITY ---

# Preserva a MainActivity, evitando que seja removida ou renomeada
-keep class br.com.clubelupa.app.MainActivity { *; }

# Preserva todas as classes que estendem de com.getcapacitor.BridgeActivity
# (Isso é crucial, pois MainActivity herda dela)
-keep public class * extends com.getcapacitor.BridgeActivity { *; }

# Preserva todas as classes e interfaces do pacote Capacitor
# Isso garante que plugins e o core do Capacitor não sejam removidos
-keep class com.getcapacitor.** { *; }
-keep interface com.getcapacitor.** { *; }

# Regras importantes para bibliotecas AndroidX, que podem ser afetadas pelo R8
-keep class androidx.webkit.** { *; }
-dontwarn androidx.webkit.**

# --- FIM DAS REGRAS ESPECÍFICAS ---