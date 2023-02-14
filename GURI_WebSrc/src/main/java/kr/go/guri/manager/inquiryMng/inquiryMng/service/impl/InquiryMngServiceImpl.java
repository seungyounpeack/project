package kr.go.guri.manager.inquiryMng.inquiryMng.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import kr.go.guri.manager.inquiryMng.inquiryMng.service.InquiryMngService;
/**
 * 관리자 > 문의 Service Implement 클래스
 * @author 권기완
 * @since 2022. 06. 25.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일			수정자			수정내용
 *  -------    		-------------   ----------------------
 *  2022.06.25.   	권기완          최초 생성
 *   
 * </pre>
 */
@Service("inquiryMngService")
public class InquiryMngServiceImpl implements InquiryMngService {

	@Resource(name = "inquiryMngMapper")
	private InquiryMngMapper inquiryMngMapper;
	
	@Override
	public List<Map<String, Object>> selectInquiryList(Map<String, Object> param) throws SQLException , IOException {
		// TODO Auto-generated method stub
		return inquiryMngMapper.selectInquiryList(param);
	}

	@Override
	public int deleteInquiryList(EgovMap map) throws SQLException , IOException {
		// TODO Auto-generated method stub
		return inquiryMngMapper.deleteInquiryList(map);
	}

}
