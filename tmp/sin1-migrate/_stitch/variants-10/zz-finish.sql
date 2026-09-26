DO $mig$ DECLARE q text; BEGIN
  SELECT convert_from(decode(string_agg(chunk, '' ORDER BY ord), 'base64'), 'UTF8') INTO q
  FROM public._mig_b64_tmp;
  EXECUTE q;
  TRUNCATE public._mig_b64_tmp;
END $mig$;