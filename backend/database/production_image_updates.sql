-- Update Page Hero Images
UPDATE pages SET hero_image = 'pages/hero/01KCS0DR9RGSDR6YEVQZ87ESDZ.jpg' WHERE slug = 'community-health';
UPDATE pages SET hero_image = 'pages/hero/01KCS1H148R2R7E82P4R5F9WZ0.jpg' WHERE slug = 'membership';
UPDATE pages SET hero_image = 'pages/hero/01KCS3W95N45PMA7VG2JGE52M2.png' WHERE slug = 'about-us';
UPDATE pages SET hero_image = 'pages/hero/01KCS0DR9SW2XR77X92NDJQC4W.jpg' WHERE slug = 'contact-us';
UPDATE pages SET hero_image = 'pages/hero/01KCS1HVGAR53XJP95AMP67YKH.jpg' WHERE slug = 'our-services';
UPDATE pages SET hero_image = 'pages/hero/01KCS3XERG7XC737DPHC82DKME.png' WHERE slug = 'home';
UPDATE pages SET hero_image = 'pages/hero/01KCS0S3RP4S4BSRSDX2N03F6A.jpg' WHERE slug = 'find-doctors';
UPDATE pages SET hero_image = 'pages/hero/01KCS1K5K59VWS59W73AF9JXRS.jpg' WHERE slug = 'telemedicine';
UPDATE pages SET hero_image = 'pages/hero/01KCT7N24FJ15J9X4FJA0WNMS2.jpeg' WHERE slug = 'nemt';
UPDATE pages SET hero_image = 'pages/hero/01KCS0W5ST0ZTEJ747T3SVT08E.jpg' WHERE slug = 'services';
UPDATE pages SET hero_image = 'pages/hero/01KCS3G5KQXFM54BQGMTYT6Z9S.jpg' WHERE slug = 'health-package';
UPDATE pages SET hero_image = 'pages/hero/01KCT7ZNBADDH9K50XDG4SR3GB.jpg' WHERE slug = 'lab-tests';
UPDATE pages SET hero_image = 'pages/hero/01KCS1CGPG2ZHJEWKNA95NCZVV.jpg' WHERE slug = 'clinics-locations';
UPDATE pages SET hero_image = 'pages/hero/01KCS3K0M27WVNPW9ZNZJNE8Q5.jpeg' WHERE slug = 'pharmacy';
UPDATE pages SET hero_image = 'pages/hero/01KCT80PEECM6TGAP3K8TYY145.jpg' WHERE slug = 'primary-health';
UPDATE pages SET hero_image = 'pages/hero/01KCS1DD6SDNE3RFXZXKKGN6QH.jpeg' WHERE slug = 'about';
UPDATE pages SET hero_image = 'pages/hero/01KCS3Q4CP9Y4G5HYAJG410BV0.jpg' WHERE slug = 'contact';

-- Update UI Settings (JSON values)
UPDATE ui_settings SET value = '{"title": "Expand Your Practice. Offer Home Visits.", "subtitle": "Join our network of esteemed doctors providing compassionate care at patients'' homes.", "image": "pages/content/01KCS0F9AW85N8TWBHAAFVVTKH.jpg"}' WHERE `key` = 'home.diagnostics';

UPDATE ui_settings SET value = '{"title": "About Us", "subtitle": "Learn more about our mission and values.", "image": "pages/hero/01KCS0S3RP4S4BSRSDX2N03F6A.jpg"}' WHERE `key` = 'about_menu';

UPDATE ui_settings SET value = '{"title": "Contact Us", "subtitle": "Get in touch with us.", "image": "pages/hero/01KCS0W5ST0ZTEJ747T3SVT08E.jpg"}' WHERE `key` = 'contact_menu';

-- Fix Banners to use local images instead of external URLs
UPDATE banners SET image_url = NULL WHERE image IS NOT NULL;
