/**
 * @Description		: 공통코드 조회 Service Abstract
 * @Source        	: CommonService.java
 * @author 			: 신용삼
 * @since 			: 2019. 8. 14. 
 * @version 		: 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일			수정자			수정내용
 *  -------    		-------------   ----------------------
 *  2019. 8. 14.    신용삼          최초 생성
 *   
 * </pre>
 */
package kr.go.guri.common.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.go.guri.common.service.CommonService;

@Service("commonService")
public class CommonServiveImpl extends EgovAbstractServiceImpl implements CommonService {

	
	@Resource(name = "commonMapper")
	private CommonMapper commonMapper;
	
	/**
	 * 권한별 메뉴 목록 조회
	 */
	@Override
	public List<Map<String, Object>> selectRoleMenuList(Map<String, Object> param) throws IOException, SQLException {
		return commonMapper.selectRoleMenuList(param);
	}
	
	
	/**
	 * 유저 권한 가져오기
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	@Override
	public Map<String, Object> selectGetRoleInfo(Map<String, Object> param) throws IOException, SQLException {
		return commonMapper.selectGetRoleInfo(param);
	}
	
	/**
	 * 메뉴 권한 체크
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	@Override
	public Map<String, Object> checkRoleMenuCnt(Map<String, Object> param) throws IOException, SQLException {
		System.out.println("실행===================");
		return commonMapper.checkRoleMenuCnt(param);
	}

	
	
}
